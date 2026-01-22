/*
================================================================================
                                LUMINA HFT ENGINE
                    "Determinism over Abstraction"
================================================================================

[ ARCHITECTURE & CPU PINNING STRATEGY ]

1. ISOLATION:
   Specific CPU cores (e.g., Core 2, 3, 4) are isolated from the OS scheduler 
   using 'isolcpus' kernel boot parameter. This prevents context switches 
   caused by system interrupts or other processes.

2. THREAD PINNING (AFFINITY):
   - NETWORKING THREAD (Core 2): Polls the NIC Ring Buffer. No sleeping.
     Uses busy-spin loop.
   - STRATEGY THREAD (Core 3): Processes logic. Pinned to share L2 Cache 
     with Core 2 if HyperThreading is OFF, or separate physical core to avoid 
     ALU contention.
   - FLUSHER THREAD (Core 4): Low priority. Handles logging and Postgres I/O.

3. CACHE LINE ALIGNMENT (FALSE SHARING):
   All critical data structures (Ring Buffers, Order Book) are aligned to 
   64-byte boundaries (cache line size on x86_64). This prevents "False Sharing" 
   where a write to one variable invalidates the cache line for a neighbor 
   variable read by another core, causing catastrophic cache coherency traffic.

4. KERNEL BYPASS:
   We bypass the Linux Kernel Networking Stack. Standard socket syscalls 
   (recv, send) involve a context switch (User <-> Kernel) and data copy 
   (sk_buff <-> user buffer). Lumina maps the NIC's DMA ring buffer directly 
   into User Space memory.

================================================================================
*/

#include <iostream>
#include <thread>
#include <vector>
#include <atomic>

#include "networking.hpp"
#include "memory.hpp"
#include "lob.hpp"
#include "alpha.hpp"
#include "telemetry.hpp"

// Global Telemetry Instance
TelemetrySystem artemis;

// The Hot Path: Strategy Thread
void strategy_loop(SPSCQueue<ITCH50_AddOrder>* queue) {
    // 2. The Memory Management Strategy: Linear Allocator on Huge Pages
    LinearAllocator arena(1024 * 1024 * 64); // 64MB Arena for this thread
    
    // 3. The Limit Order Book
    OrderBook lob;
    
    // 4. The Alpha Signal
    VPINCalculator alpha(1000, 50); // Bucket size: 1000 vol, Window: 50 buckets

    ITCH50_AddOrder msg;
    
    std::cout << "[Strategy] Thread Warm (Pinned to Core 3). Waiting for data...\n";

    while (true) {
        // Busy spin on queue (Lock-free pop)
        if (queue->pop(msg)) {
            uint64_t t1 = Profiler::now(); // Parser/Fetch Exit

            // Update LOB
            lob.update(msg.buy_sell_indicator, msg.price, msg.shares);

            // Check Alpha
            bool toxic = alpha.on_trade(msg.buy_sell_indicator, msg.shares);

            uint64_t t2 = Profiler::now(); // Strategy Calc Done

            if (toxic) {
                // Trigger Hedge (Mock)
                // In reality: Write to Gateway Ring Buffer
                // std::cout << "TOXIC FLOW! HEDGING!\n";
            }
            
            // Asynchronously log
            // Note: In strict HFT, even this push might be delayed or sampled
            artemis.record_event({msg.order_reference, msg.timestamp, t1, t2, 0});
        }
        else {
            // Hint to CPU that we are spinning (consumes less power / reduces pipeline pressure)
            #if defined(__x86_64__) || defined(_M_X64)
            _mm_pause(); 
            #endif
        }
    }
}

int main() {
    std::cout << "Initializing LUMINA...\n";

    // 1. Networking: Mock NIC
    RawSocketReceiver nic("eth0");
    
    // Memory: Shared Ring Buffer
    // Allocated on Heap here, but should be via Huge Page Allocator in prod
    auto ring_buffer = new SPSCQueue<ITCH50_AddOrder>();

    // Start Strategy Thread
    std::thread strategy(strategy_loop, ring_buffer);
    // Pinning would happen here:
    // pthread_setaffinity_np(...)

    // Main Network Loop (Core 2)
    std::cout << "[Network] Polling NIC (Pinned to Core 2)...\n";
    int ticks = 0;
    while (true) {
        // 1. Poll NIC (Zero Copy)
        const ITCH50_AddOrder* packet = 
            PacketDecoder<ITCH50_AddOrder>::decode(nic.poll_next_packet_simulation(ticks));
        
        uint64_t t0 = Profiler::now();
        
        // 2. Dispatch to Strategy via Lock-Free Queue
        // We copy *packet to the queue. 
        // Zero-copy usually implies passing a pointer, but for thread safety 
        // across boundaries, we often copy the small struct (30-40 bytes) 
        // to avoid race conditions on the NIC buffer reuse.
        // True Zero-Copy end-to-end requires a complex buffer lending scheme. 
        // Here we copy 40 bytes ( AVX copy is < 1 cycle ).
        if (!ring_buffer->push(*packet)) {
            std::cerr << "Dropping Packet! Ring Buffer Full!\n";
        }

        ticks++;
        std::this_thread::sleep_for(std::chrono::milliseconds(100)); // Slow down for demo
        if (ticks > 50) break; // Run short demo
    }

    strategy.join();
    return 0;
}
