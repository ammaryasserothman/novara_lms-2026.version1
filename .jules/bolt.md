## 2024-10-24 - Pre-grouping Calendar Events
**Learning:** Filtering arrays of events inside a loop that iterates over days of the month causes an O(N*D) performance bottleneck, especially as the number of events grows.
**Action:** Pre-group events into a Map keyed by day inside a `useMemo` block. This reduces the time complexity inside the render loop to O(1) map lookups, preventing excessive filtering calculations on every render.
