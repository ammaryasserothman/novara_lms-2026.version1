## 2024-04-20 - Replace nested .find() with Map for O(1) lookups
**Learning:** In React components like `MyCoursesPage`, using `.find()` inside a `.map()` or `.reduce()` loop over relational collections (like `enrollments` mapping to `courses`) results in O(N * M) time complexity.
**Action:** Extract the lookup logic out of the loop and pre-calculate any external relation mappings using a `Map` for O(1) lookups, reducing the algorithmic complexity to O(N + M). This improves rendering performance significantly, especially when rendering large lists of courses and enrollments.
