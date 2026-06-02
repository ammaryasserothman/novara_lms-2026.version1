## 2024-10-24 - Calendar Grid Render Bottleneck
**Learning:** Rendering monthly calendar grids where event fetching performs an array `.filter()` inside the daily render loop (31 iterations) creates an O(N*M) bottleneck when event arrays grow.
**Action:** Always pre-group date-based collections into a `Map` within a `useMemo` block keyed by day/timestamp. This reduces the daily lookup complexity from O(N) to O(1) during the render phase.
