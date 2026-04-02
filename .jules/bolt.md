
## 2024-04-02 - Array FlatMap in React Render Loops
**Learning:** Calling `array.flatMap()` directly in JSX or functional component bodies without memoization triggers full $O(N)$ re-allocation on every render. In cases where multiple derived states depend on the flattened array (like previous/next navigation and index calculation), this causes severe performance bottlenecks (N x M calculations).
**Action:** Always wrap `flatMap` logic inside a `React.useMemo` block, and if multiple derived values are needed, combine them into a single pass using simple loops (e.g., `for...of` or standard `for` loops) rather than array methods to minimize memory allocation and iterations.
