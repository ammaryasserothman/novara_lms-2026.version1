## 2025-03-09 - Pre-grouping Events for Calendar Rendering
**Learning:** Filtering arrays within a loop (like iterating through days in a month) causes O(N*D) performance overhead (where N is the number of events, D is the number of days). This is especially problematic in React renders, leading to unnecessary calculations.
**Action:** Always pre-group array items using a Map outside the loop (preferably memoized with useMemo), reducing the loop lookup to O(1) per iteration.
