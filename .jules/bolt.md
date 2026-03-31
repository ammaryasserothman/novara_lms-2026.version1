## 2024-05-18 - Optimize nested array lookups in React Contexts
**Learning:** O(N*M) nested `.includes()` inside `.filter()` operations combined with `.sort()` are common anti-patterns for generating derived arrays in React components, causing heavy computations on every render.
**Action:** Always pre-calculate an O(1) lookup Map/Set and aggregate metrics before iterating. Use `useMemo` for the result data and wrap the exposed getter function in a `useCallback` to preserve the existing function-based APIs without breaking consuming components.
