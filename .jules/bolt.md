
## 2024-11-21 - [Optimize Calendar Event Retrieval with Map Grouping]
**Learning:** In calendar components, retrieving events for each day inside the render loop using an array filter (e.g., `events.filter(e => e.date === day)`) results in an O(N*D) operation (where N is the number of events and D is the number of days). This can become a performance bottleneck as the event list grows.
**Action:** When optimizing calendar views, pre-group events using a Map within a `React.useMemo` block keyed by day to reduce retrieval from an O(N) array filter to an O(1) map lookup per day, avoiding O(N*D) filtering inside render loops.
