
## 2025-03-09 - Optimize React Context Providers
**Learning:** Using functional state updates (`setCartItems(prev => ...)`) inside `useCallback` allows the callback to have an empty dependency array (`[]`), providing a perfectly stable reference for consumers while safely accessing the latest state.
**Action:** When memoizing context functions that modify state arrays/objects, refactor to use functional updaters to minimize dependency updates and prevent downstream re-renders.
