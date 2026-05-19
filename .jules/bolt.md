## 2024-05-19 - Single-pass Filter and Aggregate
**Learning:** Computing filtered lists and aggregate metrics (like counts) via separate `.filter()` calls on the same array causes O(k*N) complexity during renders.
**Action:** Combine these derivations into a single-pass loop using `React.useMemo` to reduce algorithmic complexity to O(N) and prevent unnecessary recalculations.
