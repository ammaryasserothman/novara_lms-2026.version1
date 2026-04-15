## 2024-04-15 - [Refactor flatMap + find loops for nested arrays]
**Learning:** Using `flatMap` followed by array methods like `.find()` or `.includes()` creates intermediate arrays in memory (forcing O(N) space and time complexity) rather than terminating early when finding the correct element.
**Action:** Always optimize nested array lookups (e.g., course syllabuses with modules and lessons) by using nested `for...of` loops paired with a `Set` for O(1) lookups to allow early returns.
