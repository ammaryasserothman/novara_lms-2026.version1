## 2024-05-24 - Combine multiple array traversals in React components
**Learning:** Computing both filtered lists and aggregate metrics (e.g., counts) from the same array using separate `.filter()` calls results in unnecessary O(N) array traversals on every render.
**Action:** When deriving multiple values from a single collection in a functional component, combine the derivations into a single-pass `for...of` loop within a `React.useMemo` block to reduce algorithmic complexity from O(k*N) to O(N).
