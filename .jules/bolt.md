## 2024-05-27 - Memoize Derived State in React Components
**Learning:** Found multiple instances where array mapping, filtering, and `Set` operations were recalculating on every render due to state updates (e.g. `setFilter`).
**Action:** Use `useMemo` on computationally expensive derivations based on context (`courses`) and local state (`filter`), especially mapping arrays to new object forms and filtering arrays. This prevents O(N) recreations of lists on every click.
