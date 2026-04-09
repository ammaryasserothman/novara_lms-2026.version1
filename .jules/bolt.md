## 2024-05-24 - Optimizing getRecommendedCourses
**Learning:** `getRecommendedCourses` used an O(N*M) + O(N log N) algorithm where N is courses and M is enrollments. Using `.find()` inside `.map()`, `.includes()` inside `.filter()`, and `.sort()` with a linear search matching condition leads to massive performance degradation with larger data sets.
**Action:** Replace iterations with Set and Map lookups. Eliminate `.sort()` when we just need the top matched items, using two arrays (matches, non-matches) to gather results linearly (O(N) time, O(N) space). Memoize the result to avoid recalcs.
