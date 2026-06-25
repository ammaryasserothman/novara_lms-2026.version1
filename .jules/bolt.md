## 2024-05-24 - Calendar Events O(N*D) Filtering
**Learning:** O(N) array filtering per calendar day (`O(N*D)`) causes unnecessary overhead in calendar views compared to an `O(1)` map lookup per day after `O(N)` pre-grouping.
**Action:** Use a `Map` within a `useMemo` to group events by day to optimize grid rendering.
