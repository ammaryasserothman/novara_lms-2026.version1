## 2024-05-15 - [Optimize Calendar Views]
**Learning:** O(N) array filtering inside loops creates O(N*D) complexity.
**Action:** Pre-group events using a Map within a React.useMemo block keyed by day to reduce retrieval to an O(1) map lookup per day.
