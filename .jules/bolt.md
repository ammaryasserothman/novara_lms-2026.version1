## 2024-05-14 - UseMemo for Filtering Iterations
**Learning:** Found O(N) recalculations on filter operations occurring on every render in NotificationsPage and CalendarPage.
**Action:** Use React.useMemo() for filtering arrays and collections that recalculate on render in React components to avoid unnecessary O(N) operations.
