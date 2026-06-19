## 2024-10-24 - Pre-grouping Calendar Events
**Learning:** Filtering arrays per-day within the render loop for Calendar views scales poorly (O(N*D)) where N is total events and D is days in month. This results in heavy CPU usage during month navigation.
**Action:** Use a React.useMemo block to pre-group filtered events into a Map by day (O(N) single pass). During rendering of days, use a simple map.get(day) which is O(1).
