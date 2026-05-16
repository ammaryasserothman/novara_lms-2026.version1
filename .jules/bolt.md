## 2024-05-16 - Array Method Combinations
**Learning:** Combining multiple `O(N)` array iterations like `.filter().length` and a generic `.filter()` based on different conditions on the exact same array can be consolidated into a single `O(N)` pass using `for...of` alongside `useMemo` for a tangible CPU reduction, especially as mock data lists grow in this application.
**Action:** Always inspect sequential array derivations in React functional components for opportunities to perform a single-pass extraction when early returns do not block the extraction into a React hook.
