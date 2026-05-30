## 2024-05-30 - [Pre-group calendar events]
**Learning:** Pre-grouping calendar events into an O(1) map lookup significantly improves rendering performance by avoiding O(N*D) filtering (where N is events, D is days in month). Also learned that derived state involving sorting operations should be wrapped in useMemo to prevent expensive O(N log N) recalculations on every component render.
**Action:** Always pre-group data when rendering grids or calendars instead of filtering per cell/day. Wrap `.sort()` operations in `useMemo`.
