## 2024-04-03 - Context Re-render Algorithmic Bottleneck
**Learning:** `getRecommendedCourses` in `GlobalContext` used O(N*M) `.find()` inside `.map()` and an O(N log N) `.sort()`. Since it runs on every render without memoization, it degrades performance as the course catalog grows and forces unnecessary allocations.
**Action:** Pre-compute derived state in Contexts using `useMemo` with O(1) Lookups (Set) and single-pass iterations, and return it via a `useCallback` getter to preserve the existing API while preventing expensive recalculations.
