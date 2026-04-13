## 2024-05-24 - React.useMemo for Feature Pages Array Filtering
**Learning:** React functional components triggering array `filter` or `map` operations inline inside the component body, result in these expensive computations recalculating from scratch on *every single render*.
**Action:** When filtering or mapping data in React components, wrap the operations in `React.useMemo` to prevent redundant O(N) array allocation on re-renders, thereby avoiding excessive garbage collection and performance degradation.
