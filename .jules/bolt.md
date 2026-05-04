
## 2024-05-23 - Single-Pass Loop Optimization in React
**Learning:** Using chained array methods (`.filter().map().slice()`) and `Object.keys()` on object collections can cause significant `O(N)` array allocation overhead and algorithmic complexity in heavily rendered components.
**Action:** When early returns prevent the use of `React.useMemo` due to hook rules, use synchronous single-pass `for...in` loops to derive active elements and map other elements to avoid unnecessary memory allocation and iterations.

## 2024-05-23 - Map Optimization for Rendering Loops
**Learning:** Using `.filter()` inside a rendering loop to match nested properties (e.g. `events.filter(e => e.day === currentDay)` during a month loop) results in `O(N * M)` complexity, causing significant overhead as the array grows.
**Action:** Use `React.useMemo` to group the array items into a `Map` organized by the query key (e.g., `eventsByDay.get(day)`) prior to rendering. This converts the complexity to `O(N + M)` with `O(1)` lookups per iteration.
