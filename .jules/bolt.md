## 2025-03-01 - Avoid O(N*D) Filtering in Calendar Render Loops
**Learning:** Filtering arrays within a loop that iterates over days (e.g., getting events for each day in a month view) results in O(N*D) complexity. For calendars with numerous events, this becomes a performance bottleneck specific to this architecture.
**Action:** Pre-group the events by day into a `Map` within a `useMemo` block to reduce lookup complexity to O(1) per day, turning the overall complexity into O(N+D).
