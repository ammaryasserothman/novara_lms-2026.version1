## 2024-11-21 - Optimize Notifications filtering
**Learning:** React component derived state often results in O(k*N) complexity when computing filtered lists and aggregates via separate .filter() chains. This can be problematic as collection sizes grow.
**Action:** When computing both filtered lists and aggregate metrics (e.g., counts) from the same array, combine these derivations into a single-pass loop within a React.useMemo block to reduce algorithmic complexity to O(N).
