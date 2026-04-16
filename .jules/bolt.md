## 2024-04-16 - Optimize Nested Array Searches (Syllabus Lessons)
**Learning:** Using `flatMap` followed by `.find()` or `.includes()` on deeply nested arrays (like course syllabuses) creates intermediate arrays in memory and forces full traversal (O(N) space and time). This is a noticeable bottleneck when finding next/previous lessons.
**Action:** Replace `flatMap` chains with nested `for...of` loops to allow early returns, and use a `Set` for O(1) lookups against completed items.
