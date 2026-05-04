## 2024-06-15 - Optimize Chained Arrays After Early Returns
**Learning:** When refactoring chained array methods inside React components where early returns prevent the use of `useMemo` due to React's Rules of Hooks, using synchronous single-pass `for...in` loops allows O(N) allocation optimization without violating hook rules.
**Action:** Apply synchronous loop patterns to derive state when React Rules of Hooks restrict `useMemo` usage.
