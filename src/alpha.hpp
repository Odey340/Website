#pragma once

#include <cstdint>
#include <cmath>
#include <vector>
#include <iostream>
#include <numeric>

// 4. The Alpha Signal: VPIN & Orderflow Toxicity

// Fixed-Point Arithmetic Wrapper
// Precision: 10^4 (4 decimal places)
// 150.00 -> 1500000
using Price = int64_t;
using Volume = int64_t;

constexpr int64_t SCALAR = 10000;

class VPINCalculator {
private:
    Volume bucket_volume_threshold;
    Volume current_bucket_volume;
    Volume current_buy_vol;
    Volume current_sell_vol;
    
    std::vector<int64_t> oi_history; // Order Imbalance history
    size_t window_size;

public:
    VPINCalculator(Volume volume_bucket_size, size_t n_buckets) 
        : bucket_volume_threshold(volume_bucket_size), 
          current_bucket_volume(0),
          current_buy_vol(0),
          current_sell_vol(0),
          window_size(n_buckets) {
            oi_history.reserve(n_buckets);
    }

    // Returns true if Toxic Flow Detected
    bool on_trade(char side, Volume ex_shares) {
        if (side == 'B') current_buy_vol += ex_shares;
        else current_sell_vol += ex_shares;

        current_bucket_volume += ex_shares;

        if (current_bucket_volume >= bucket_volume_threshold) {
            // Bucket Complete
            int64_t imbalance = std::abs(current_buy_vol - current_sell_vol);
            
            if (oi_history.size() >= window_size) {
                oi_history.erase(oi_history.begin());
            }
            oi_history.push_back(imbalance);

            // Reset bucket
            current_bucket_volume = 0;
            current_buy_vol = 0;
            current_sell_vol = 0;

            return check_toxicity();
        }
        return false;
    }

    bool check_toxicity() {
        if (oi_history.empty()) return false;

        // Calculate VPIN
        // VPIN = SMA(OI) / SMA(Volume)  <-- Simplified for this context
        // Actually, we check if current Imbalance is > 3 * StdDev of History
        
        // 1. Calculate Mean
        int64_t sum = std::accumulate(oi_history.begin(), oi_history.end(), 0LL);
        int64_t mean = sum / oi_history.size();

        // 2. Calculate StdDev (Fixed Point approximation)
        int64_t sq_sum = 0;
        for(int64_t val : oi_history) {
            int64_t diff = val - mean;
            sq_sum += (diff * diff); // Danger of overflow in real life, ok for logic demo
        }
        int64_t variance = sq_sum / oi_history.size();
        int64_t std_dev = static_cast<int64_t>(std::sqrt(variance));

        // 3. Check Threshold
        int64_t last_oi = oi_history.back();
        if (last_oi > (mean + 3 * std_dev)) {
            std::cout << "[Alpha] ALERT: Toxic Flow Detected! VPIN Spike.\n";
            return true;
        }
        return false;
    }
};
