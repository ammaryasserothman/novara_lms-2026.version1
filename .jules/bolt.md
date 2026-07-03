## 2025-03-09 - Calendar Array Filtering Inside Render Loop
**Learning:** Found a common React anti-pattern in the Calendar component where it was filtering the entire events array (O(N)) for each day in the month loop (O(D)), resulting in O(N*D) complexity on every render and month change.
**Action:** Always pre-group hierarchical data (like events by day or messages by thread) into a Map inside a single `React.useMemo` block. This reduces the per-day/item retrieval cost from O(N) filtering to O(1) map lookup.
