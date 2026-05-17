## 2024-05-19 - UseMemo for Derived Arrays
**Learning:** O(N) array manipulations in React render loops can cause performance issues if not memoized. Use `useMemo` for derived arrays (like `filteredEvents`) to prevent unnecessary recalculation on every render.
**Action:** When filtering or transforming arrays in React components, wrap the logic in `useMemo` with appropriate dependencies to avoid performance overhead.
