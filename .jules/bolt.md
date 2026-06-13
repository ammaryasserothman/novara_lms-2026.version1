## 2024-06-13 - Replace O(N*D) Calendar Render Loops with O(1) Map Lookups
**Learning:** In calendar components with lots of events, performing an `array.filter()` for each individual day (e.g., 31 days) inside the main render function causes severe performance degradation as the event count grows (O(N*D)).
**Action:** Wrap date filtering logic inside a single-pass `React.useMemo` that groups events into a `Map` keyed by the day number. This converts the O(N) lookup inside the daily loop into a fast O(1) operation (`map.get(day)`), avoiding massive recalculation loops during re-renders.
