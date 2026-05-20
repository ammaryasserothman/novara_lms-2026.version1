
## 2024-05-20 - [NotificationsPage Optimization]
**Learning:** Combining multiple array operations (like `.filter()`) into a single-pass loop within a `React.useMemo` reduces the algorithmic complexity and eliminates multiple array allocations.
**Action:** Always prefer a single-pass loop wrapped in `React.useMemo` when computing both filtered lists and aggregate metrics (like counts) from the same source array to improve O(N) operations and minimize re-renders.
