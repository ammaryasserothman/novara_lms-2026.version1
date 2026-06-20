
## 2024-06-20 - Calendar Event Grouping
**Learning:** Found an O(N*D) performance bottleneck in CalendarPage.tsx where a flat array of filtered events was iterated over multiple times for every day of the month using array filtering, causing performance hits (5.7ms vs 1.6ms after optimization).
**Action:** When filtering relational collections in loop rendering (like days in a month), pre-group the items in a single pass using React.useMemo and a Map, replacing O(N) array scans with O(1) map lookups per rendering item.
