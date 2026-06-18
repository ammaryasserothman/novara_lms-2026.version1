## 2024-05-18 - Avoid O(N*D) filtering in render loops
**Learning:** Filtering an array of N events for each day (D) inside a render loop causes unnecessary O(N*D) recalculations, hurting performance on complex calendar views.
**Action:** Pre-group events by day using a Map within a React.useMemo block to reduce the operation to O(N) upfront processing and O(1) lookups per day.
