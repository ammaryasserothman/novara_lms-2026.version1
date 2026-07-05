## 2024-05-10 - Initial Setup
**Learning:** Initializing journal for Bolt.
**Action:** Always measure before and after optimization.

## 2024-05-10 - O(N*D) filtering inside render loops
**Learning:** Found an O(N*D) operation where events were filtered per day during render (`CalendarPage.tsx`).
**Action:** Use a Map within a `useMemo` keyed by day to reduce retrieval from an O(N) array filter to an O(1) map lookup per day.
