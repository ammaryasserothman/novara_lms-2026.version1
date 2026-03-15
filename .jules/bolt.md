## 2024-10-27 - Context Provider Value Memoization
**Learning:** In a large React app heavily relying on global context (like `GlobalContext`), passing unmemoized objects (e.g., `value={{ data, actions }}`) triggers deep re-renders across all consuming components when the Provider component re-renders (e.g. from parent re-renders) *without* an actual internal state change.
**Action:** Always wrap context values in `React.useMemo` to ensure referential equality for the provided value when the underlying data stores haven't changed.
