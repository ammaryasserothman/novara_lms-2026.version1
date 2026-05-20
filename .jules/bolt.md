## 2024-05-20 - Initialization
**Learning:** Initializing Bolt journal.
**Action:** Ready to optimize.

## 2024-05-20 - Single Pass List Transformation & Metric Derivation
**Learning:** In functional React components, running multiple `.filter()` or `.reduce()` passes over the same list to derive distinct metrics (like unread counts and filtered views) degrades performance (O(k*N)).
**Action:** When computing both filtered lists and aggregate metrics from the same array, always combine the derivations into a single-pass `for...of` loop inside a `React.useMemo` block to reduce algorithm complexity from O(k*N) to O(N).
