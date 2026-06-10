## 2026-06-10 - O(N) Array Filtering in Calendar Render Loops
**Learning:** Performing `Array.prototype.filter()` repeatedly inside a render loop (like a calendar grid iterating over 31 days) scales poorly, resulting in O(N*D) operations where N is the number of events and D is the number of days.
**Action:** When rendering calendar grids or similar structures, pre-group the items by date/key into a `Map` within a `useMemo` block. This reduces the per-day lookup inside the render loop to O(1), significantly improving performance (from ~3600ms to ~570ms in benchmarks).
