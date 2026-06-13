## 2024-10-24 - Pre-grouping nested loops using Maps
**Learning:** In React components with calendars or schedules, calculating specific subset of records for inner components (e.g., matching a date) leads to nested loops. A common anti-pattern is running an array `.filter()` during the render loop of inner elements (O(N * D) where N is events and D is days).
**Action:** Replace nested loops by pre-grouping datasets using a `Map` wrapped in a `React.useMemo` block. This reduces the algorithmic complexity to an O(N + D) pass, dramatically lowering computational overhead during re-renders.
