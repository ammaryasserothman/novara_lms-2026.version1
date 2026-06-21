## 2024-06-21 - [Optimize Calendar Grouping]
**Learning:** Pre-grouping events in calendar views using a Map avoids O(N*D) complex filtering inside render loops.
**Action:** Always pre-group lists into lookup maps within a useMemo block before rendering nested iterations.
