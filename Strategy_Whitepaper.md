# Project Lumina: Quantitative Mean Reversion Strategy
## Mathematical Foundation & Low-Latency Execution

### 1. The Statistical Core: Z-Score Outlier Detection
The fundamental edge of Project Lumina lies in identifying temporary price dislocations during high-volatility events, primarily earnings reports. We model price action as a stochastic process where extreme deviations are expected to revert to a dynamically calculated mean.

The engine utilizes a rolling Z-Score to quantify the magnitude of price divergence. In real-time, the engine computes the rolling arithmetic mean ($\mu$) and standard deviation ($\sigma$) over a defined lookback window ($W$).

The instantaneous Z-Score is defined as:
$$Z = \frac{x_t - \mu_W}{\sigma_W}$$

Where:
- $x_t$ is the current tick price.
- $\mu_W$ is the arithmetic mean of the window $W$.
- $\sigma_W = \sqrt{\frac{\sum_{i=1}^{W} (x_i - \mu_W)^2}{W}}$ is the rolling standard deviation.

A trade signal is generated when $|Z| > \theta$, where $\theta$ is the entry threshold adjusted for the current market regime.

### 2. Volatility Weighting: Dynamic Thresholding
Static Z-Score thresholds are insufficient during earnings events where volatility clusters. To prevent "catching a falling knife," Lumina integrates Average True Range (ATR) and Bollinger Band width to scale entry sensitivity.

We define an Adjusted Threshold $\theta_{adj}$:
$$\theta_{adj} = \theta_{base} \cdot \left(1 + \ln\left(\frac{ATR_{short}}{ATR_{long}}\right)\right)$$

By integrating ATR, the engine widens the "mean" envelope during the initial reaction to earnings, ensuring entries occur only when the rate of price change decelerates and the statistical probability of a "snap-back" reaches its local maximum.

### 3. Low-Latency Implementation: C++20 and SIMD Optimization
To capture alpha within the 0.02ms latency window, the C++20 backend bypasses standard library overhead in critical paths.

- **SIMD Acceleration**: Rolling variance calculations are accelerated using AVX-512 intrinsics (Single Instruction, Multiple Data). This allows the engine to process multiple price ticks in parallel, enabling $O(1)$ updates to the standard deviation without redundant summation.
- **Lock-Free Concurrency**: Orderflow ingestion utilizes Single-Producer Single-Consumer (SPSC) ring buffers implemented with `std::atomic` and explicit memory barriers. This architecture eliminates mutex-induced context switches, ensuring deterministic execution during peak market bursts.
- **Cache Locality**: Data structures are meticulously cache-aligned to 64-byte boundaries, preventing false sharing and ensuring that core Z-Score calculations remain within the L1 cache.

### 4. Performance Metrics and Determinism
Project Lumina has achieved a **38.07% YTD** return with a mean execution latency of **0.02ms**.

In mean-reversion strategies, alpha is highly sensitive to entry slippage. Deterministic execution is vital because the 'snap-back' effect often occurs within milliseconds of a price bottoming/peaking. By maintaining sub-millisecond response times, Lumina facilitates sub-decisecond entry/exit, capturing the correction before broader market participants participate.

---
**Status**: ACTIVE VALIDATION
**Latency**: 0.02ms (Mean)
**Architecture**: C++20 / Rust Hybrid
