
## 2025-04-28 - NotificationsPage O(2N) Optimizations
**Learning:** NotificationsPage computed `filteredNotifications` and `unreadCount` via two separate array filtering methods directly within the functional render component. This created O(2N) complexity per render and missed opportunities to avoid constant recalculations using useMemo.
**Action:** When filtering arrays and concurrently computing counts over array elements in a React Component, use a single-pass `for..of` loop bundled within a `useMemo` block to traverse the array O(N) times and to prevent repeated operations across unnecessary re-renders.
