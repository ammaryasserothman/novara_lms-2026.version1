## 2025-04-26 - React Memoization and Object.keys
**Learning:** When passing `Object.keys()` derived from state directly into a dependency array of `React.useMemo` or `React.useCallback`, it causes a new array instance to be created on every render. This completely breaks the memoization check (which relies on referential equality) and causes the hook to continuously recalculate.
**Action:** Always derive the keys inside the `useMemo` callback block instead of calculating them outside and passing them as dependencies.
