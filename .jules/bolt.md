## 2024-06-27 - [Calendar Optimization]
**Learning:** Found O(N*D) filtering loop inside render logic for Calendar component. When there are hundreds of events, filtering for every single day causes noticeable slowdowns in the render loop.
**Action:** Replace `Array.filter` inside render iterations with a `useMemo` that pre-groups events into a Map by day (O(N) upfront, O(1) per day lookup) to drastically reduce computational overhead.
