## 2025-02-28 - Optimize nested array traversals
**Learning:** Using `flatMap` for sequentially searching nested structures like `course.syllabus` forces intermediate array allocations, resulting in repeated O(N) garbage collection on every render (e.g., inside disabled checks).
**Action:** Replace `flatMap` with single-pass nested loops to allow early returns, track state synchronously, and eliminate intermediate memory allocations without manual memoization.
