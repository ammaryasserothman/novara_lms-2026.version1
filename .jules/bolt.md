## 2024-06-15 - Optimize Calendar Grid Rendering
**Learning:** Filtering arrays directly within a render loop that iterates over many items (like days in a month grid) causes O(N*D) performance degradation where N is the number of events and D is the number of days.
**Action:** Use `React.useMemo` to pre-group data into a `Map` structure keyed by the iteration identifier (e.g., day of month). This converts the inner lookup to O(1), significantly reducing computational overhead during re-renders.
