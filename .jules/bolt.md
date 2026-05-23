## 2023-10-24 - Single-Pass Loop with useMemo
**Learning:** Computing filtered lists and aggregate metrics using multiple .filter() calls causes O(k*N) complexity and unnecessary re-computations on every render.
**Action:** Combine these derivations into a single-pass loop within a React.useMemo block to reduce complexity to O(N) and memoize the result.
