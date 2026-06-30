## 2024-10-24 - Calendar Event O(N*D) Loop
**Learning:** Found an O(N*D) performance bottleneck in the calendar render loop where it was filtering the global events array for every single day box in the month view `daysInMonth` times.
**Action:** Always pre-group calendar events by day into a `Map` within a `useMemo` block to reduce `getEventsForDay` from an O(N) array filter to an O(1) map lookup. Use a static `EMPTY_EVENTS` array as fallback to maintain React reference stability.
