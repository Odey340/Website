#pragma once

#include <vector>
#include <cstdint>
#include <cstdlib>
#include <atomic>
#include <iostream>
#include <new>
#include <memory>

// MOCK: Linux Huge Pages constants
#ifndef MAP_HUGETLB
#define MAP_HUGETLB 0x40000
#endif

constexpr size_t PAGE_SIZE_HUGE = 2 * 1024 * 1024; // 2MB
constexpr size_t ARENA_SIZE = 1024 * 1024 * 1024; // 1GB (Simulated subset of 2GB)

// 2. Memory Management Strategy (The "Heap-Free" Hot Path)

class LinearAllocator {
private:
    uint8_t* memory_start;
    uint8_t* current_ptr;
    size_t total_size;

public:
    LinearAllocator(size_t size = ARENA_SIZE) : total_size(size) {
        // In production: mmap(NULL, size, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS | MAP_HUGETLB, -1, 0);
        // For simulation/cross-platform compilation, we use standard malloc but treated as a rigid arena.
        memory_start = static_cast<uint8_t*>(std::aligned_alloc(4096, size)); 
        current_ptr = memory_start;
        
        if (!memory_start) {
            std::cerr << "[Memory] FATAL: Failed to allocate Huge Page Arena!\n";
            std::abort();
        }
        std::cout << "[Memory] Pre-allocated " << (size / 1024 / 1024) << "MB of Huge-Page Memory.\n";
    }

    ~LinearAllocator() {
        std::free(memory_start);
    }

    template <typename T>
    T* alloc(size_t count = 1) {
        size_t bytes = sizeof(T) * count;
        // Check overflow (in debug)
        if (current_ptr + bytes > memory_start + total_size) {
            std::cerr << "[Memory] OOM in Arena!\n";
            std::abort();
        }
        
        uint8_t* ptr = current_ptr;
        current_ptr += bytes;
        return reinterpret_cast<T*>(ptr);
    }
    
    // Reset for next day (rarely used in persistent HFT, but good for testing)
    void reset() {
        current_ptr = memory_start;
    }
};

// Lock-Free Single Producer Single Consumer (SPSC) Ring Buffer
// Used to pass parsed Market Data events to the Strategy Thread
template <typename T, size_t Capacity = 1024>
class SPSCQueue {
private:
    struct alignas(64) Slot {
        T data;
    };
    
    Slot buffer[Capacity];
    
    // Cache line alignment to prevent false sharing
    alignas(64) std::atomic<size_t> head{0}; // Consumer index
    alignas(64) std::atomic<size_t> tail{0}; // Producer index

public:
    bool push(const T& val) {
        size_t current_tail = tail.load(std::memory_order_relaxed);
        size_t next_tail = (current_tail + 1) % Capacity;

        if (next_tail == head.load(std::memory_order_acquire)) {
            return false; // Full
        }

        buffer[current_tail].data = val;
        tail.store(next_tail, std::memory_order_release);
        return true;
    }

    bool pop(T& val) {
        size_t current_head = head.load(std::memory_order_relaxed);
        
        if (current_head == tail.load(std::memory_order_acquire)) {
            return false; // Empty
        }

        val = buffer[current_head].data;
        head.store((current_head + 1) % Capacity, std::memory_order_release);
        return true;
    }
};
