
## 2024-05-15 - Array Restructures Inside Render
**Learning:** Using `flatMap` (or other array creation/mapping methods) inline inside component render/JSX directly creates unnecessary intermediate array allocations on every render cycle. When these are duplicated (e.g., in multiple `disabled` and `onClick` handlers), it multiplies the performance cost heavily.
**Action:** Extract nested array flat mapping out of JSX, memoize it with `React.useMemo`, and reference the resulting array multiple times to prevent redundant O(N) recalculations and ease garbage collection.
