## 2024-10-24 - Calendar Event Grouping
**Learning:** In React components that render daily calendars or schedules, filtering the main event array individually for each day inside a map loop causes O(N*D) complexity (where N is events, D is days in view). This leads to significant performance degradation as the event list grows.
**Action:** Pre-group events using a Map inside a React.useMemo block keyed by day (or date string). This reduces the per-day retrieval from an O(N) array filter to an O(1) map lookup, avoiding nested filtering overhead inside render loops.
