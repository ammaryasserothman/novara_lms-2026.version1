## 2024-05-24 - Calendar Events O(N*D) Filtering
**Learning:** In CalendarPage, `getEventsForDay` filters the entire `EVENTS` array inside a loop for every day in the month (`[...Array(daysInMonth)].map(...)`), leading to O(N * D) performance where N is events and D is days in the month.
**Action:** Group events by day in a `useMemo` block using a `Map` or an array of arrays keyed by day. Then simply perform an O(1) lookup during the calendar render loop.
