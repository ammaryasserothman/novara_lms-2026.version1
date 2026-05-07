## 2024-05-07 - AssignmentsPage Filter Optimization
**Learning:** React components sometimes re-filter the exact same array multiple times to derive different grouped counts and lists, causing O(k*N) complexity. `MOCK_ASSIGNMENTS` was being filtered 6 times for 3 statuses.
**Action:** Replace multiple `.filter()` calls mapped to the same collection with a single-pass `for...of` loop inside a `useMemo` block that categorizes the items into a record or object. Ensure a clear explanatory comment is added to highlight the performance logic to satisfy Bolt requirements.
