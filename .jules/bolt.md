## 2024-11-21 - Optimize Derived State Filtering

**Learning:** NotificationsPage calculated both `filteredNotifications` and `unreadCount` via two separate, unmemoized `.filter()` arrays on every render.
**Action:** Always combine related array derivations into a single-pass loop within `React.useMemo` to drop algorithmic complexity from O(k*N) to O(N) and prevent memory thrashing.
