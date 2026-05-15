## 2024-05-15 - Combine Filter and Aggregation Loops
**Learning:** When computing both filtered lists and aggregate metrics (e.g., counts) from the same array in React components, using multiple `.filter()` calls results in O(k*N) complexity.
**Action:** Combine these derivations into a single-pass loop within a React.useMemo block to reduce algorithmic complexity to O(N) and prevent unnecessary re-calculations on every render.
