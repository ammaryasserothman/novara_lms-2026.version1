## 2024-10-24 - Calendar Page O(N*M) Rendering Optimization
**Learning:** In React components that render grids (like calendars), filtering a list of events dynamically inside a `map` over the grid cells results in O(N*M) algorithmic complexity. The React 19 Compiler does not automatically optimize algorithmic structures into Map lookups.
**Action:** Use `React.useMemo` to group relational data into a `Map` before iterating over grid cells, reducing algorithmic complexity from O(N*M) to O(N+M) with O(1) map lookups during the render cycle.
