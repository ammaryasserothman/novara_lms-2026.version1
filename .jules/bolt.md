## 2024-10-24 - Calendar View O(N*D) Filtering Bottleneck
**Learning:** In `CalendarPage.tsx`, calculating events for each day of the month by doing `events.filter(...)` inside the render loop for 31 days caused an O(N*D) overhead on every render, leading to unnecessary computation.
**Action:** When mapping or rendering grouped components by day or category, pre-group items into a Map using `React.useMemo` to convert O(N*D) filtering inside render loops to a single O(N) grouping pass and O(1) loop lookups.
