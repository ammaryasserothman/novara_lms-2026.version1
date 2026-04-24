## 2026-04-24 - Array filtering and mapping operations in feature pages
**Learning:** Array filtering and mapping operations in feature pages (e.g., NotificationsPage, SupportPage, CalendarPage) should be memoized with React.useMemo to prevent O(N) re-calculation and unnecessary re-renders. Additionally, hoist repeated string operations like .toLowerCase() outside of inner .map() or .filter() loops to prevent O(N*M) string allocation overhead.
**Action:** Use React.useMemo and hoist string operations.
