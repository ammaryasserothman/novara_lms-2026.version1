## 2026-03-17 - Memoize GlobalContext value
**Learning:** The monolithic GlobalContext object was forcing all consumers to re-render upon any state change because its value was re-created on every render. Wrapping the value in useMemo with memoized callback functions prevents widespread frequent re-renders.
**Action:** Always wrap context values in useMemo and context functions in useCallback when the context acts as a monolithic store for multiple entities.
