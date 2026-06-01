## 2024-06-01 - Calendar Event Render Optimization
**Learning:** O(N) array filtering (`getEventsForDay`) within a loop for days in a month inside the React render block causes performance bottlenecks, especially when the total event list (`filteredEvents`) scales. Calling filter for every day leads to O(N * Days) execution on every re-render.
**Action:** Replace `getEventsForDay` by pre-grouping events using a `Map` within a `React.useMemo` block keyed by day. This reduces retrieval from an O(N) array filter to an O(1) map lookup per day, avoiding O(N*D) filtering inside render loops.
