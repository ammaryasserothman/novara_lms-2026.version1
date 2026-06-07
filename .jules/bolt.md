## 2024-06-07 - Pre-grouping related items replaces O(N*D) operations
**Learning:** In React UI rendering, calculating grouped data inside a render loop via filtering (like O(N*D) where D=days in month and N=items) can cause severe unnecessary recalculations.
**Action:** Extract nested filtering and logic from render loops using `React.useMemo` to construct an intermediate O(1) lookup Map to ensure faster, scale-free rendering loops.
