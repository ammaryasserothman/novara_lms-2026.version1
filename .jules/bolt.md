
## 2024-05-18 - Avoid Object.keys in dependencies
**Learning:** When using `React.useMemo` to optimize object iteration based on keys, passing the result of `Object.keys(obj)` in the dependency array causes a new array allocation on every render, which will break the memoization check and cause it to recalculate continuously.
**Action:** Always derive the keys (e.g., `Object.keys(obj)`) inside the `useMemo` callback and pass the parent object itself in the dependency array.
