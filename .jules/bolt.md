## 2026-04-27 - Calendar Render Optimization
**Learning:** Calendar components are prone to O(N * Days) rendering complexity if events are filtered per-day inside the grid loop.
**Action:** Always pre-group events into a Map by day/date before rendering a calendar grid to achieve O(1) lookup per day.
