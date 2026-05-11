## 2024-05-14 - Initial Setup
**Learning:** Initial setup for performance optimizations.
**Action:** Always start by checking for obvious O(N) or O(N*M) performance bottlenecks in React components.

## 2024-10-24 - Combining Filters into Single Pass
**Learning:** Sequential `.filter()` calls on arrays with multiple derived metrics create O(k*N) complexity.
**Action:** When calculating filtered items and derived aggregate metrics from the same array, always combine the loops into a single pass using `React.useMemo` to reduce algorithmic complexity to O(N).
