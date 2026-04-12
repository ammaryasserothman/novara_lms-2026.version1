## 2024-05-18 - Memoize Next Lesson Calculation
**Learning:** `getNextLesson` in `GlobalContext` flattens the entire syllabus with `flatMap` on every call. This will be triggered on every re-render for every course if used in lists, leading to O(N*M) array allocations.
**Action:** Use a nested loop with an early return to find the next lesson efficiently without allocating temporary arrays via `flatMap`.
