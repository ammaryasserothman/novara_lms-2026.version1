## 2023-11-20 - Memoizing Multiple Array Pass Traversals
**Learning:** In functional React components, multiple `.filter()` and `.length` calls on the same array in the render body result in redundant iteration passes (O(k*N)) and re-calculating on every render, which becomes a bottleneck.
**Action:** When computing both filtered collections and aggregate metrics from the same array, always combine them into a single-pass loop inside `React.useMemo` to reduce algorithmic complexity to O(N) and avoid recalculation on unrelated state changes.
