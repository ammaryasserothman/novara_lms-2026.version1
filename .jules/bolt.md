
## 2024-05-19 - Context Derived State Memoization
**Learning:** When derived state logic with complex O(N*M) array operations (e.g., mapping, filtering, sorting like `getRecommendedCourses`) is exposed as a function in a React Context, it executes on every render for every subscriber, causing significant performance degradation.
**Action:** Optimize by pre-computing the result using `React.useMemo` (dependent on the underlying state) and wrapping the getter function in `React.useCallback` that simply returns the memoized result. This eliminates redundant recalculations while maintaining backward compatibility with existing components that expect a function call.
