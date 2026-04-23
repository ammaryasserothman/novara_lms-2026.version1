## 2024-05-20 - String Allocation in Filter Loops
**Learning:** Calling `.toLowerCase()` inside nested `.map()` and `.filter()` operations during render causes significant O(N*M) string allocation overhead, which becomes a bottleneck on frequently updating states like search inputs.
**Action:** Always hoist repeated string operations outside of array iteration loops and memoize the resulting filtered array using `React.useMemo` to prevent recalculation on unrelated renders.
