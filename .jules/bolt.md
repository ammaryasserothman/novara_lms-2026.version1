## 2026-04-17 - [Optimize Array Operations in Lesson Navigation]
**Learning:** Using `flatMap` followed by `findIndex` on the nested `course.syllabus` array creates intermediate arrays and takes O(N) space and time. Repeatedly performing this operation inside functional components or closures is a performance anti-pattern. React 19 compiler handles basic synchronous state cleanly.
**Action:** Replace multiple `flatMap` and `findIndex` operations with a single-pass nested `for...of` loop to pre-calculate previous, current, and next lesson items, avoiding O(N) intermediate array creations.
