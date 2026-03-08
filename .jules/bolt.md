
## 2025-03-08 - Dashboard Render Cycle Optimization
**Learning:** `getRecommendedCourses()` returns a newly instantiated array on every call, bypassing standard React diffing if passed directly to children without memoization. Furthermore, moving early returns below `useMemo` hooks requires moving context safety checks (e.g. `if (!user) return { ...defaultFallback }`) *inside* the `useMemo` block to prevent exceptions.
**Action:** Always verify if a context function returns reference-stable values before using it directly in render logic. Memoize its output when it relies on external arrays, and ensure safety checks are included inside the dependency callbacks.
