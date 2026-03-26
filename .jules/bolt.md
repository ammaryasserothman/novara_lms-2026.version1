## 2025-02-28 - Optimizing React Context Array Operations
**Learning:** Using `Object.keys()` mapping over nested array `find()` and `includes()` operations in React context getters results in hidden O(N*M) complexity that fires on every render.
**Action:** When filtering complex data across interconnected states (e.g. `courses` and `enrollments`), compute a single-pass O(N) lookup utilizing JavaScript `Set` and cache the final result with `React.useMemo`. Expose via `React.useCallback` to maintain function-based APIs.
