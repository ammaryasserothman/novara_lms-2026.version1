## 2024-05-24 - [Optimize getRecommendedCourses in GlobalContext]
**Learning:** Found O(N*M) + O(N log N) sorting logic in `getRecommendedCourses` inside `src/context/GlobalContext.tsx`. Using Maps and Sets with a single pass reduces algorithmic complexity significantly.
**Action:** Replace `Array.prototype.find` inside `.map` and the subsequent `.sort()` with a single-pass `Map`/`Set` approach to reduce time complexity to O(N + M). Wrap with `useCallback` to prevent reference changes across renders.
