## 2024-05-24 - [Monolithic Context Getters]
**Learning:** Functions returned in a context provider's value that recalculate derived state synchronously (like filtering/sorting a large array) bypass referential equality checks. Downstream components calling these functions during render receive fresh references every time, causing widespread and unnecessary re-renders.
**Action:** Always pre-compute derived state in a context using `useMemo` with the proper data dependencies, and return the memoized result via `useCallback` to preserve the function API and object identity.
