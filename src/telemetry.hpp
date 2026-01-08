#pragma once

#include <vector>
#include <thread>
#include <atomic>
#include <chrono>
#include <iostream>
#include <mutex>
#include <condition_variable>

// 5. The "Artemis" Observability Integration

struct TelemetryEvent {
    uint64_t msg_seq_num;
    uint64_t t0_ingress;
    uint64_t t1_parser;
    uint64_t t2_strategy;
    uint64_t t3_egress;
};

class Profiler {
public:
    // RDTSC: Read Time-Step Counter
    // Returns number of CPU cycles since reset.
    // Extremely low overhead (~10-20 cycles).
    static inline uint64_t now() {
        // MSVC specific __rdtsc(), or x86 intrinsic
#ifdef _MSC_VER
        return __rdtsc();
#else
        unsigned int lo, hi;
        __asm__ __volatile__ ("rdtsc" : "=a" (lo), "=d" (hi));
        return ((uint64_t)hi << 32) | lo;
#endif
    }
};

class TelemetrySystem {
private:
    // Ring buffer for logs (Lock-free MPSC ideally, here using mutex for simplicity of code snippet 
    // but in prompt implementation it asks for "flushed asynchronously")
    std::vector<TelemetryEvent> buffer;
    std::mutex mtx;
    std::condition_variable cv;
    bool running;
    std::thread flusher_thread;

public:
    TelemetrySystem() : running(true) {
        buffer.reserve(10000);
        // Start background flushing thread
        flusher_thread = std::thread(&TelemetrySystem::postgres_flusher, this);
    }

    ~TelemetrySystem() {
        running = false;
        cv.notify_one();
        if(flusher_thread.joinable()) flusher_thread.join();
    }

    void record_event(const TelemetryEvent& evt) {
        // High-perf path: Minimal locking or lock-free queue push
        std::lock_guard<std::mutex> lock(mtx);
        buffer.push_back(evt);
        if (buffer.size() > 100) {
            cv.notify_one();
        }
    }

    // The Background Drainer
    void postgres_flusher() {
        std::cout << "[Telemetry] DB Flusher Thread Started (CPU Core: Isolated)\n";
        
        while (running) {
            std::unique_lock<std::mutex> lock(mtx);
            cv.wait(lock, [this] { return !buffer.empty() || !running; });

            if (!buffer.empty()) {
                std::vector<TelemetryEvent> batch;
                batch.swap(buffer); // Quick swap to release lock
                lock.unlock();

                // Mock PostgreSQL Insert
                // In production: libpq `COPY telemetry FROM STDIN`
                if (!batch.empty()) {
                    // Simulating DB Latency
                    // std::this_thread::sleep_for(std::chrono::milliseconds(1)); 
                    std::cout << "[Artemis] Flushed " << batch.size() << " events to PostgreSQL. Sample T2-T0: " 
                              << (batch[0].t2_strategy - batch[0].t0_ingress) << " cycles.\n";
                }
            }
        }
    }
};
