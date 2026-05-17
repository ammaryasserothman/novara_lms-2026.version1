## 2024-05-17 - Initializing Bolt Journal
**Learning:** Initializing journal for logging critical performance insights.
**Action:** Use this file to record codebase-specific bottlenecks, failed optimizations, and surprising edge cases.

## 2024-05-17 - Missing useMemo for filter lists
**Learning:** React components calculating filtered lists on every render when dependencies haven't changed.
**Action:** Apply `React.useMemo` to `filteredNotifications` and `unreadCount` in `NotificationsPage` and `filteredEvents` and `upcomingDeadlines` in `CalendarPage` to avoid unnecessary computations on every re-render. Combine multiple computations where possible (like `filteredNotifications` and `unreadCount`) into a single pass using `reduce` for O(N) performance.
