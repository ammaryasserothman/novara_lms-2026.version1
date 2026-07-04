## 2024-10-24 - Optimizing React Render Filters with Maps
**Learning:** O(N) array filtering inside loops running per-render causes significant O(N*D) slowdowns (where N = events, D = days). The calendar view repeatedly filtered the entire `EVENTS` array to find events for each day (31 days).
**Action:** Always pre-group collections inside `useMemo` using `Map<K, V[]>` to convert per-item O(N) filtering into O(1) lookups when rendering items mapped to specific keys (e.g., days).
