#pragma once

#include <cstdint>
#include <cstring>
#include <type_traits>
#include <iostream>

// Replicating NASDAQ ITCH 5.0 Message Formats (Simplified)
// Reference: http://www.nasdaqtrader.com/content/technicalsupport/specifications/dataproducts/NQTVITCHspecification.pdf

// Ensure strictly packed memory layout to match wire format
#pragma pack(push, 1)

struct ITCH50_MsgHeader {
    uint16_t length;
    char type;
};

// 'A' - Add Order Message (No MPID)
struct ITCH50_AddOrder {
    char type;                  // 'A'
    uint16_t stock_locate;
    uint16_t tracking_number;
    uint64_t timestamp;         // Nanoseconds from midnight
    uint64_t order_reference;
    char buy_sell_indicator;    // 'B' or 'S'
    uint32_t shares;
    char stock[8];
    uint32_t price;             // 4 decimals implicitly
};

// 'E' - Order Executed
struct ITCH50_OrderExecuted {
    char type;                  // 'E'
    uint16_t stock_locate;
    uint16_t tracking_number;
    uint64_t timestamp;
    uint64_t order_reference;
    uint32_t executed_shares;
    uint64_t match_number;
};

#pragma pack(pop)

// Zero-Copy Decoder Template
// Intention: Cast raw memory bytes to struct T directly.
// The CPU executes NO parsing instructions, just memory loads.
template <typename T>
class PacketDecoder {
public:
    static const T* decode(const void* buffer) {
        // In a real scenario, we might check bounds here if not confident in the ring buffer.
        // For HFT, we often trust the NIC driver put complete frames.
        return reinterpret_cast<const T*>(buffer);
        // Note: Endianness conversion (ntohl) is omitted for "simulated" High-Perf environment 
        // or assumed handled by NIC offload / local endianness match.
    }
};

// Simulated Direct NIC Access "mock"
class RawSocketReceiver {
public:
    RawSocketReceiver(const char* interface_name) {
        std::cout << "[Networking] Initializing Mock Direct NIC Access on " << interface_name << "...\n";
        std::cout << "[Networking] NIC Ring Buffer Mapped via Kernel Bypass (Simulated).\n";
    }

    // Returns a pointer to the next packet in the ring buffer logic
    const void* poll_next_packet_simulation(int step) {
        static ITCH50_AddOrder mock_add;
        mock_add.type = 'A';
        mock_add.timestamp = 1234567890 + step;
        mock_add.order_reference = 1000 + step;
        mock_add.buy_sell_indicator = (step % 2 == 0) ? 'B' : 'S';
        mock_add.shares = 100 + (step * 10);
        mock_add.price = 1500000 + (step * 500); // 150.00
        std::memcpy(mock_add.stock, "GOOGL   ", 8);

        return &mock_add;
    }
};
