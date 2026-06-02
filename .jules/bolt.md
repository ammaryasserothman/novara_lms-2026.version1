## 2024-06-02 - O(N*D) Calendar Filtering Bottleneck
**Learning:** In Calendar views, filtering a flat event array for each day creates an O(N*D) bottleneck (where N=events, D=days), leading to significant main thread blocking on large datasets.
**Action:** Pre-group events into a Map using React.useMemo keyed by day to reduce algorithmic complexity to O(N + D), replacing the inner O(N) array filter with an O(1) Map lookup.
