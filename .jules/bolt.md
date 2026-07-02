
## 2024-05-24 - Calendar View Bottleneck
**Learning:** O(N*D) filtering inside React render loops causes severe performance degradation on feature pages when processing large data sets (e.g., 1000+ calendar events). Repeated `Array.filter` calls over all events for each day of a month view block the main thread.
**Action:** Always pre-group sequential data into an O(1) hash map within a `React.useMemo` block keyed by the loop index (e.g., day of month). Avoid any unmemoized O(N) array scans inside render iterations. Use static fallback values (e.g., `eventsByDay.get(day) || []`) to preserve React reference stability.
