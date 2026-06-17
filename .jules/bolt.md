## 2024-06-17 - Pre-grouping Calendar Events with Map

**Learning:** When rendering calendar grids, filtering a master events array for *every* day in the render loop creates an O(N*D) bottleneck (where N is events, D is days). Array filtering inside render is especially punishing as data scales.
**Action:** Always pre-group date-based collections into a Map within a `React.useMemo` block keyed by day (or relevant unit). This reduces retrieval during the render loop to an O(1) map lookup, preventing rendering bottlenecks.
