## 2024-10-24 - Calendar Grid Render Bottleneck
**Learning:** Recomputing day-specific events using an array filter `O(N)` inside a render loop over calendar days `O(D)` leads to `O(N*D)` complexity per render, causing lag on calendar views with many events.
**Action:** When rendering calendar grids, pre-group events into a Map using `React.useMemo` keyed by day. This reduces retrieval to an `O(1)` Map lookup per day, avoiding O(N) array filtering inside the render loop. Also, define fallback empty arrays (`EMPTY_EVENTS`) outside components to maintain React reference stability.
