## 2025-02-28 - Optimizing Notification Filtering
**Learning:** React components that compute both filtered lists and aggregate metrics (e.g. unread counts) from the same array using multiple `.filter()` calls have O(k*N) complexity. Combining these derivations into a single-pass loop reduces it to O(N).
**Action:** Always combine derivations into a single loop using `useMemo` when computing both counts and subsets from the same source array to prevent redundant iterations.
