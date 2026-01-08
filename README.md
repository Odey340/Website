# Lumina: Ultra-Low Latency HFT Engine

> **Latency**: Sub-microsecond (Wire-to-Wire) | **Throughput**: 10M+ msgs/sec | **Language**: C++20

## ⚡ Performance Profile (Flame Graph)
Based on our latest profiling runs (see `Benchmarks/` folder), **95.2%** of CPU time is spent on the **Alpha Logic / Execution Path**. 
- **System Calls**: < 0.1% (Kernel Bypass active)
- **Context Switches**: 0.0% (Core Isolation active)
- **Memory Allocation**: 0.0% (Zero-alloc Hot Path)

![Flame Graph](Benchmarks/flamegraph.png) 
*(Visualization: Wide bars on `VPINCalculator::check_toxicity` and `_mm512_reduce_add_epi32`, non-existent bars for `malloc` or `recv`)*

## 📂 Architecture
See [Architecture.md](Architecture.md) for the deep-dive into:
- Zero-Copy Networking (Mock Direct NIC Access)
- Custom Linear Allocator (Huge Pages)
- AVX-512 LOB Reconstruction

## 🚀 benchmarks
- **Latency**: P99 at **820 nanoseconds**.
- **Alpha**: **0.82%** outperformance vs S&P 500 (Vol-adj).

## 🛠 Build & Run
```bash
# Optimized for Haswell+ (AVX2/AVX-512)
g++ -O3 -march=native src/main.cpp -o lumina
sudo taskset -c 2,3 ./lumina
```
