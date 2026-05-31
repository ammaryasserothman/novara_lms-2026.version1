## 2024-10-24 - Calendar Grid Rendering Optimization
**Learning:** Rendering calendar grids where each day dynamically filters a main events array (O(N*D) complexity) causes measurable layout blocking, especially since it's recalculated within the render phase on every state change.
**Action:** When filtering dates inside calendar rendering loops, pre-group events into a `Map` memoized with `React.useMemo` to convert array scans into O(1) lookups per day.
