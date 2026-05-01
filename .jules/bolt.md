## 2024-05-17 - Calendar Page Optimization

**Learning:** `getEventsForDay` inside a render mapping over 30 days of the month causes repeated $O(N)$ filtering iterations, leading to $O(N \times D)$ rendering cost. Using a single-pass `useMemo` to group events into a Map transforms the time complexity to $O(N)$, which is a critical algorithmic performance optimization for Calendar-like UIs.
**Action:** Always extract inner `filter` and `find` loops over the same array inside list mappings. Instead, utilize single-pass derivations caching intermediate state with Maps (`useMemo`) for $O(1)$ lookups.
