## 2024-03-24 - Array Iteration Consolidation
**Learning:** Combining consecutive array filter and map operations into a single loop via map/filter chaining, or a custom reduce/forEach approach in a useMemo reduces operations from O(k*N) to O(N).
**Action:** When filtering or transforming relational collections, consolidate derivations inside useMemo rather than mapping/filtering independently when possible.
