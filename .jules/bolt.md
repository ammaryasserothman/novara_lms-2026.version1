## 2024-05-17 - Single-Pass Array Derivation Anti-Pattern
**Learning:** This codebase frequently computes multiple derived states (e.g., filtered lists and aggregate counts) from the same source array using separate `.filter()` calls on every render (e.g., in `NotificationsPage`). This results in O(k*N) time complexity and unnecessary re-evaluations.
**Action:** When optimizing feature pages, combine multiple array derivations into a single-pass loop (`for...of`) within a `React.useMemo` block to reduce algorithmic complexity to O(N) and avoid redundant render cycles.
