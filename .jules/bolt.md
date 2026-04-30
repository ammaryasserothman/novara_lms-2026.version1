## 2024-11-13 - Optimize Calendar Grid Rendering
**Learning:** Found an O(N*M) filtering bottleneck inside the calendar grid rendering loop where `EVENTS.filter` was called for every single day in the month.
**Action:** Always pre-calculate and group events by day into a `Map` using a single-pass O(N) loop wrapped in `React.useMemo` before rendering calendar grids.
