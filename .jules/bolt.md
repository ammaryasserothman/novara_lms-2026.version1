## 2024-10-24 - Optimize Calendar Rendering
**Learning:** Found a common bottleneck in React calendar/grid components where an O(N) array `.filter()` is used inside the render loop for each day (`[...Array(daysInMonth)].map`), resulting in O(N*D) complexity that significantly slows down the main thread when rendering large data collections.
**Action:** Always pre-calculate derived relational state using a `Map` within a `React.useMemo` block before rendering. This transforms O(N*D) nested filtering into an O(N) single-pass setup, allowing for O(1) lookups during the render cycle.
