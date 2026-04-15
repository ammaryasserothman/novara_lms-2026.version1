## 2024-04-14 - Prevent O(N) array reallocation during JSX render
**Learning:** Using inline `.flatMap` and `.findIndex` operations repeatedly inside JSX causes O(N) array re-allocations on every render. This gets especially expensive when rendering arrays from nested structures (like a course syllabus).
**Action:** Extract the flattened array derived state out of JSX and memoize it using `React.useMemo` to compute the derivation once per dependency change rather than every render cycle.
