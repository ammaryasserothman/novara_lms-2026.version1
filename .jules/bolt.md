## 2024-10-24 - Pre-grouping Events for Calendar Render
**Learning:** In `CalendarPage.tsx`, filtering events for every day inside the render loop (`O(N * D)` where `D` is the number of days in the month) causes substantial unnecessary recalculations and overhead during the rendering phase.
**Action:** Use a `Map` within a `useMemo` block to group events by day (`O(N)`). Then, retrieve the events for each day using `map.get(day)` in `O(1)` time inside the render loop.
