## 2024-05-18 - Calendar Event Filtering Loop Optimization
**Learning:** `getEventsForDay` in CalendarPage loops over all filtered events for EVERY day in the month view, leading to O(Days * Events) performance per render. While N is small currently, this approach scales poorly when the calendar has more events, and causes unnecessary allocations.
**Action:** Replace dynamic array filtering inside the render loop with a pre-computed `Map` or indexed object based on day/date keyed values within a `useMemo` hook to achieve O(1) lookups per day.
