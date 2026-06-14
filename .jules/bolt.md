# Bolt's Journal

## 2024-10-24 - Pre-Group Events in Calendar Views
**Learning:** Filtering an array repeatedly inside a render loop (especially nested loops like iterating days of a month) causes O(N*D) complexity, leading to performance bottlenecks.
**Action:** Use a `Map` within a `useMemo` block to group events beforehand. This transforms the retrieval to an O(1) lookup per day, drastically reducing redundant operations.
