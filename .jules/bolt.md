## 2024-04-28 - Optimizing O(2N) array traversals
**Learning:** Found unmemoized double `.filter()` array traversals in NotificationsPage causing O(2N) complexity on every render.
**Action:** Use a single `React.useMemo` to iterate through the array once (O(N)), calculating both `filteredNotifications` and `unreadCount` simultaneously to prevent unnecessary re-evaluations and allocations.
