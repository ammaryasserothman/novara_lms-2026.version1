## 2024-06-06 - Optimize calendar event filtering with Map
**Learning:** Filtering a flat array of events repeatedly for each day in a month (O(N*D) complexity) is a significant bottleneck, causing performance issues in calendar views.
**Action:** Pre-group events by day using a `Map` within a `useMemo` block. This reduces retrieval from an O(N) array filter to an O(1) map lookup per day, avoiding O(N*D) filtering inside render loops.
