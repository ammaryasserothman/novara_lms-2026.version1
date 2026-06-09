## 2024-10-24 - [O(1) Event Mapping in Calendar]
**Learning:** Performing O(N) array filtering within an inner loop (e.g., finding events for every day in a month, resulting in O(N*D) operations) significantly degrades render performance as collections grow.
**Action:** Pre-calculate grouped datasets using a `Map` within a `useMemo` block to allow O(1) lookups during the render loop, reducing time complexity and avoiding unnecessary reference instability.
