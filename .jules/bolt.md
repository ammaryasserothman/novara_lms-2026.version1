## 2024-10-24 - Calendar View Map Pre-grouping Optimization
**Learning:** In calendar views, filtering arrays inside render loops for each day causes O(N*D) performance, leading to UI thread blocking.
**Action:** Always pre-group array data using a Map within a `React.useMemo` block keyed by the grouping criteria (e.g., day). This reduces retrieval to an O(1) map lookup per group, avoiding expensive filtering loops during render. Additionally, ensure fallback empty arrays (like `EMPTY_EVENTS`) are defined outside the component to maintain React reference stability.
