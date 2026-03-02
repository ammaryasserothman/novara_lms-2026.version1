
## 2025-03-02 - React Hooks and Early Returns Context Pattern
**Learning:** When optimizing React functional components with `useMemo` for derived global context data (which prevents expensive O(N) recalculations on every render), it is critical to place the `useMemo` hook strictly *before* any early return statements (like `if (!user) return null;`). Failing to do so violates React's Rules of Hooks, leading to runtime errors and linter failures.
**Action:** Always inspect the component's existing early returns and structure the `useMemo` block to execute at the top-level scope before them. Destructure the memoized data *after* the early returns if needed.
