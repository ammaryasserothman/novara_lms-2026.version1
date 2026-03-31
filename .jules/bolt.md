
## 2024-05-20 - Memoizing Object Filtering with useMemo/useCallback
**Learning:** Context provider functions like `getRecommendedCourses` created via typical arrow functions are re-created on every render, causing re-renders down the tree, and executing O(N*M) lookups on every single render.
**Action:** Always refactor derived values to a memoized list via `useMemo` first. Then return them via `useCallback` to maintain existing API structures and avoid unnecessary deep component tree re-renders and costly recalculations.
