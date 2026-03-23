
## 2024-05-18 - [Memoizing Expensive Getters in Context]
**Learning:** When attempting to memoize expensive computations in React context that are exposed via a getter function interface (e.g. `getRecommendedCourses`), replacing the pure function with `useMemo` breaks the interface if consumers expect to call it as `getRecommendedCourses()`.
**Action:** Use `useMemo` to precompute the underlying data and track dependencies (e.g., `courses`, `enrollments`), then expose a wrapper function using `useCallback` (e.g., `const getX = useCallback(() => memoizedX, [memoizedX])`) to maintain backward compatibility with components using the function-based API without triggering recomputation on every render.
