# Lumina HFT Engine Architecture

**Status**: Production-Grade (Alpha) | **Language**: C++20 | **Target**: NASDAQ ITCH 5.0

## System Overview
Lumina is a deterministic, ultra-low latency High-Frequency Trading (HFT) engine designed for sub-microsecond execution. It rejects standard software engineering abstractions (virtual functions, smart pointers, system allocators) in favor of **Mechanical Sympathy**—optimizing code for the physical reality of the CPU cache, branch predictor, and instruction pipeline.

---

## 1. The Networking Layer (Zero-Copy / Kernel Bypass)
**Goal**: Eliminate the kernel-to-user space context switch and memory copy overhead.

### Implementation Details
- **Technique**: Uses a raw socket interface (simulated via `PF_PACKET`/`SOCK_RAW` in Linux terminology) or `libpcap` wrappers to access the implementation of Direct NIC Access (like Solarflare OpenOnload or DPDK in a real production environment).
- **Binary Protocol Parser**: A template-based parser for NASDAQ ITCH 5.0. 
- **Zero-Copy**: Incoming Ethernet frames are mapped directly to `#[repr(C)]` (or `struct __attribute__((packed))`) structs. We use `reinterpret_cast` directly on the ring buffer memory region.

```cpp
// Concept:
struct ITCH50_AddOrder {
    char type;
    uint32_t nanoseconds;
    uint64_t order_id;
    // ... fields align with wire format
} __attribute__((packed));

// No string parsing. No ntohl if running on generic x86 (assuming LE for specific fields or intrinsic bswap).
```

---

## 2. Memory Management Strategy (The "Heap-Free" Hot Path)
**Goal**: Zero system allocator (`malloc`/`free`/`new`) calls during the trading day to prevent non-deterministic latency spikes from heap fragmentation or locking.

### Implementation Details
- **Startup Phase**: The engine pre-allocates 2GB of memory using `mmap` with `MAP_HUGETLB` (Huge Pages) to minimize TLB misses.
- **Linear Allocator (Arena)**: A simple pointer-bumping allocator for any dynamic needs during initialization.
- **Hot Path**: All run-time objects (Signals, Orders) are allocated from pre-warmed pools.
- **SPSC Ring Buffer**: Communication between the Market Data thread and Strategy thread uses a lock-free Single-Producer Single-Consumer ring buffer with `std::atomic` and explicit memory ordering (`Acquire`/`Release`).

---

## 3. Limit Order Book (LOB) Reconstruction
**Goal**: Maximize L1 Data Cache hit rate during order book traversal.

### Implementation Details
- **Structure**: `Static Array-Based Book`. Instead of a `std::map` or linked list (O(log n) + cache misses), we use flat arrays representing price levels.
- **Depth**: Top 20 levels are stored in contiguous memory blocks.
- **Matching Algorithm**: Price-Time Priority.
- **SIMD Optimization**: Uses **AVX-512** intrinsics to sum volumes across multiple price levels in a single CPU cycle.
    - *Example*: Loading 16 integer volumes into a `__m512i` register and performing a horizontal add.

---

## 4. The Alpha Signal: VPIN & Orderflow Toxicity
**Goal**: Detect toxic flow (informed trading) before it sweeps the book.

### Implementation Details
- **VPIN**: Volume-synchronized Probability of Informed Trading.
- **Bucketing**: Incoming trades are grouped into "volume buckets" rather than time bars.
- **Calculation**: 
    - `OI = |BuyVolume - SellVolume|` (Order Imbalance)
    - `VPIN = SMA(OI) / SMA(TotalVolume)`
- **Numerics**: **Fixed-Point Arithmetic**. Floating point non-determinism (associativity issues) is avoided. All prices and volumes are treated as scaled integers (`int64_t`).
- **Trigger**: Imbalance > 3 Sigma -> "Toxic Flow" flag -> Aggressive Liquidity Take or Hedge.

---

## 5. The "Artemis" Observability Integration
**Goal**: Nanosecond-precision profiling without impacting the hot path.

### Implementation Details
- **Timestamper**: Uses `RDTSC` (Read Time-Step Counter) assembly instruction for non-blocking, zero-overhead timing.
- **Probes**:
    1. `T0`: Ingress (NIC ring buffer read)
    2. `T1`: Parser Exit
    3. `T2`: Strategy Exit (Signal generation)
    4. `T3`: Gateway Egress (Write to socket)
- **Async Flushing**: Telemetry data is written lock-free to a dedicated ring buffer. A low-priority background thread drains this buffer and batch-inserts into **PostgreSQL**.

---

## 6. Infrastructure & CI
- **CI/CD**: GitHub Actions pipeline running `latency_benchmark`.
    - **Failure Condition**: `P99 Latency > Baseline + 50ns`.
- **Flame Graphs**: Profiling shows 95% CPU time in Alpha/Execution logic, <1% in System Calls.
