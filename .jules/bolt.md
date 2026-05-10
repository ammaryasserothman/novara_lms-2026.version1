## 2024-05-11 - Optimize Derived State Filtering
**Learning:** Multiple consecutive array filter operations for derived state in React components cause redundant iterations and unnecessary array allocations, especially when un-memoized.
**Action:** Combine derivations into a single-pass `for...of` loop within a `React.useMemo` block to reduce algorithmic complexity from O(k*N) to O(N) and minimize re-renders.
