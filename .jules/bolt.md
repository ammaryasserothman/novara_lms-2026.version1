## 2024-06-01 - Calendar O(N*D) Filter Optimization
**Learning:** Found a performance bottleneck in `CalendarPage.tsx` where an O(N) filter on `filteredEvents` was being executed for every day of the month grid (O(N * 30)).
**Action:** Replace `Array.prototype.filter` inside render loops with a pre-calculated `Map` constructed inside a `React.useMemo` block, allowing O(1) lookups per day.
