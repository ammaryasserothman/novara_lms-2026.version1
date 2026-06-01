
## 2024-06-01 - Calendar O(N*D) Filtering Bottleneck
**Learning:** React component rendering an entire month (30+ days) was calling an O(N) array filter for *every single day* inside the render loop, causing O(N*D) complexity.
**Action:** Pre-group items using a Map keyed by day inside a `useMemo` block, reducing the inner loop operation from an O(N) filter to an O(1) map lookup.
