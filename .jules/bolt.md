## 2024-10-24 - Calendar Events Memoization
**Learning:** O(N) array filtering within the render loop for finding daily events in a large array causes high CPU load, scaling poorly (O(N*D)) when checked for every day of the month.
**Action:** Replace filtering by mapping the collection into a Map (`eventsByDay`) grouped by day within a React.useMemo block. This provides O(1) lookups per day. Avoid recalculating derived values like `upcomingDeadlines` on each render by also wrapping them in `useMemo`.
