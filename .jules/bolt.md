## 2024-05-24 - Context Memoization Anti-Pattern
**Learning:** Core state contexts (`GlobalContext`, `CartContext`) lacked memoization for their provided `value` object and internal state functions, causing O(N) re-renders across the entire component tree whenever minor context values changed (e.g. notifications).
**Action:** Always wrap context provider value objects in `useMemo` and extract provided functions via `useCallback` with exact dependency arrays to maintain stable object references and prevent widespread React re-renders.
