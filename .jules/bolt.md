## 2023-10-27 - [Optimize getRecommendedCourses Complexity]
**Learning:** `getRecommendedCourses` in `GlobalContext` used O(N*M) nested loops (`find` inside `map`, `includes` inside `filter` and `sort`), leading to significant performance degradation with larger datasets.
**Action:** Replace arrays with `Set` for O(1) lookup and use a single loop to find top recommendations and gracefully fallback, eliminating `sort`. Wrap in `useCallback` to avoid regenerating function on every render, and memoize logic in `useMemo`.
