## 2024-05-23 - Optimize Array Derivations in React Functional Components
**Learning:** Extracting relational filtering and array mapping into a single pass block using `useMemo` with a Map for lookups reduces O(N*M) algorithmic complexity to O(N+M) and avoids unnecessary N array re-allocations on each render.
**Action:** When filtering relational collections in React components, extract loop logic and precalculate external mappings using a `Map` within a `useMemo` block.
