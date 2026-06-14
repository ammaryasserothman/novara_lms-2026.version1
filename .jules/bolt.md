## 2025-02-18 - Replacing O(N*D) Filter with O(1) Map Lookup in Calendar Rendering
**Learning:** Found an O(N*D) loop in `CalendarPage.tsx` where an `Array.filter` over `events` was nested inside a map of the month's `days` within the render cycle. This causes the same `events` array to be iterated 31 times per render.
**Action:** Replaced the in-render filter with a pre-computed `Map` wrapped in `React.useMemo`. The map pre-groups events by day in a single pass O(N), reducing the day-by-day lookup to O(1).
