#pragma once

#include <array>
#include <cstdint>
#include <immintrin.h> // AVX-512
#include <iostream>

// 3. The Limit Order Book (LOB) Reconstruction

struct Level {
    uint32_t price;
    uint32_t volume;
    // Padding to ensure 8-byte alignment or to fit cache lines together
};

// Static Array-Based Book
// Optimization: 20 levels fits in two cache lines (approx) if packed right, 
// but here we align for SIMD.
constexpr int WEB_DEPTH = 20;

class OrderBook {
public:
    // Aligned for AVX-512 (64 bytes)
    alignas(64) std::array<uint32_t, 16> bid_prices;
    alignas(64) std::array<uint32_t, 16> bid_volumes;
    
    alignas(64) std::array<uint32_t, 16> ask_prices;
    alignas(64) std::array<uint32_t, 16> ask_volumes;

    OrderBook() {
        // Initialize with dummy data
        for (int i=0; i<16; ++i) {
            bid_volumes[i] = 100 * (i+1);
            ask_volumes[i] = 100 * (i+1);
        }
    }

    void update(char side, uint32_t price, uint32_t volume) {
        // Simple update logic (O(N) for insertion in array)
        // In real LOB, we'd have optimized insertion logic. 
        // For this demo, we assume the arrays are populated.
        // This function is just a placeholder.
    }

    // SIMD (AVX-512) Calculation of Total Volume
    // Logic: Sum the volumes of the top 16 levels in a single instruction cycle context.
    uint32_t get_total_bid_volume_avx512() {
        #if defined(__AVX512F__)
        // 1. Load 16 volumes (32-bit integers) into a 512-bit register
        // aligned load because we used alignas(64)
        __m512i vol_vector = _mm512_load_si512((void*)bid_volumes.data());

        // 2. Horizontal Add (Reduce)
        // _mm512_reduce_add_epi32 sums all 16 integers
        return _mm512_reduce_add_epi32(vol_vector);
        #else
        // Fallback for non-AVX-512 machines (e.g. standard dev laptop)
        // To preserve compilation.
        uint32_t sum = 0;
        for(auto v : bid_volumes) sum += v;
        return sum;
        #endif
    }
};
