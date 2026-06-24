
## 2024-06-24 - Calendar Grid Rendering Bottleneck
**Learning:** O(N) filtering inside a render loop for a calendar grid causes O(N*D) performance (N events * D days in month).
**Action:** Replace `Array.filter` inside render loops with an O(1) map grouping approach. Pre-group items using a Map keyed by day inside a `useMemo` block, and use `map.get(day) || EMPTY_EVENTS` for the actual render loop to eliminate recalculation overhead.
