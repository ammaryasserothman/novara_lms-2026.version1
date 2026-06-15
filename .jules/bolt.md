## 2024-06-15 - Optimization Initialization
**Learning:** Initializing bolt journal to keep track of learnings.
**Action:** Proceeding with the optimization task.
## 2024-06-15 - Optimize Calendar rendering with O(1) Map lookups
**Learning:** Performing O(N) array filtering within an inner loop for each day in a calendar view scales poorly, resulting in O(N*D) operations.
**Action:** Pre-group events using a `Map` within a `useMemo` block keyed by day. This reduces retrieval to an O(1) map lookup per day, drastically improving performance (benchmark showed ~4.88x improvement).
