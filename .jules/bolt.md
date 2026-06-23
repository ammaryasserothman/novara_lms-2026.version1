## 2024-06-23 - Calendar Grid Filtering Bottleneck
**Learning:** Rendering calendar grids often involves iterating over 31+ days and calling a function like `getEventsForDay(day)`. If that function runs a `.filter()` over the entire events array, it results in an O(N * D) complexity that recalculates on every render, severely impacting performance.
**Action:** When rendering multi-day grids or lists that require filtering from a unified array, use `React.useMemo` to pre-group items by day/id into a `Map` in O(N) time, making the subsequent render-loop lookups O(1).
