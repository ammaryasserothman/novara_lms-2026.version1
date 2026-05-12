## 2024-03-24 - Initial Bolt setup
**Learning:** Initialize Bolt's journal for the novara-lms codebase to document codebase-specific performance insights.
**Action:** Append critical insights, edge cases, or performance findings during tasks here.
## 2024-05-12 - Combined multiple array iterations into single pass useMemo
**Learning:** React components (like NotificationsPage) were iterating over the same `notifications` array multiple times using `.filter()` (O(2N)). React 19's compiler optimizes some logic, but manual single-pass loops are needed to reduce algorithmic complexity when simultaneously calculating independent derived states (e.g., filtered arrays and aggregate counts).
**Action:** Always look for multiple `.filter()`, `.map()`, or `.reduce()` calls on the same array and combine them into a single-pass loop within `React.useMemo`.
