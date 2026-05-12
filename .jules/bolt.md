## 2024-05-12 - Calendar rendering optimization
**Learning:** React component rendering with filtered events per day loop caused unnecessary re-computation per day.
**Action:** Use a single `React.useMemo` to group events by day into a `Map` so the per-day render lookup becomes O(1) instead of filtering the array over and over again. Also included the upcoming deadlines in the same loop to avoid a second pass.
