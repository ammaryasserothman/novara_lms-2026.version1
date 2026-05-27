## 2024-05-27 - Calendar Grid Optimization
**Learning:** O(N*D) filtering inside calendar render loops causes significant performance degradation, particularly on month views with many events.
**Action:** Always pre-group calendar events using a `Map` within a `useMemo` block keyed by day, reducing retrieval to an O(1) map lookup per day instead of an O(N) array filter.
