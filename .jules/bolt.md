## 2024-05-13 - O(N) single-pass optimization
**Learning:** Combining multiple filter/reduce operations into a single loop using `useMemo` is a safe and effective way to reduce algorithmic complexity from O(k*N) to O(N) and prevent unnecessary re-renders in React components dealing with lists.
**Action:** When working on lists, look for instances where the same array is looped over multiple times (e.g. for filtering and computing an aggregate like a count) and combine them into a single pass using `useMemo`.
