## 2024-10-24 - Optimizing React Render Loops with Map Lookups
**Learning:** In `CalendarPage.tsx`, rendering a calendar grid previously iterated over all events to filter for each specific day inside the render loop (`O(N * D)` where N is events and D is days in month).
**Action:** Always pre-group data into a `Map` within a `useMemo` block outside the render loop. This reduces the time complexity to `O(N)` for initial grouping and `O(1)` per day lookup, significantly preventing UI lag when rendering grid or list views containing large datasets.
