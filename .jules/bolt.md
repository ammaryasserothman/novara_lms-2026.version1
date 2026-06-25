## 2024-05-18 - Optimized Calendar Events Lookups
**Learning:** React component iteration performing an O(N) `.filter()` over events inside an O(D) map of days causes O(N*D) operations per render. This degrades performance significantly when event arrays are large.
**Action:** Use `React.useMemo` to group events by their respective day into a `Map` so filtering becomes an O(1) retrieval inside the render loop map function.
