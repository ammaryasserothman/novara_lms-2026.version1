## 2025-02-24 - Single-Pass Loop Optimization in React
**Learning:** Combining multiple array iterations (like filtering lists and computing aggregate metrics) from the same array into a single-pass loop within a `React.useMemo` block reduces time complexity from O(k*N) to O(N) and optimizes React re-renders.
**Action:** Always combine related iterations into a single-pass `useMemo` block when deriving multiple metrics or filtered lists from the same source array in React components.
