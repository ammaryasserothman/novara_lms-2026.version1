
## 2024-11-20 - [Optimize Array Filtering in NotificationsPage]
**Learning:** Combining multiple array derivations (like filtering lists and calculating aggregate counts) from the same source array into a single-pass loop within `React.useMemo` reduces algorithmic complexity from O(k*N) to O(N).
**Action:** Always look for opportunities to consolidate multiple `.filter()` or `.map()` operations on the same array into a single `useMemo` block to minimize iteration overhead.
