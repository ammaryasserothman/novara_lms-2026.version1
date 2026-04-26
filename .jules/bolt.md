
## 2024-05-18 - [Optimized Derived States in NotificationsPage]
**Learning:** O(2N) array traversals can be reduced to O(N) by calculating multiple derived states (e.g. filtered arrays and counts) in a single loop inside a `useMemo` block, which also prevents unnecessary recalculation on every render.
**Action:** Always look for consecutive array operations like `.filter().length` on the same data source, and combine them into a single pass using `useMemo` when possible to optimize frontend rendering performance.
