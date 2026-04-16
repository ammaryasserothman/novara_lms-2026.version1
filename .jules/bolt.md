## 2024-05-14 - Replace Repeated flatMap Calls in Render with useMemo Pre-calculation
**Learning:** Found an anti-pattern in `LessonPage.tsx` where `course.syllabus.flatMap(m => m.lessons)` is repeatedly called inside multiple render functions (like `onClick` and `disabled` props of Next/Previous buttons). This creates a new array on every render and performs redundant O(N) traversals.
**Action:** When calculating sequential item relationships (like previous/next lesson IDs) in nested arrays, avoid multiple `flatMap` or `findIndex` traversals during render. Instead, pre-calculate them using `React.useMemo` to evaluate them once per dependency change. This reduces O(N) operations and prevents unnecessary garbage collection.

## 2024-05-14 - React Compiler manual memoization warning
**Learning:** React 19 Compiler enforces strict rules. Returning an object containing variables that are assigned multiple times within a `useMemo` block triggers a "Compilation Skipped: Existing memoization could not be preserved" warning.
**Action:** Avoid manual useMemo with reassigned variables returning early. If needed, just omit `useMemo` since the compiler will auto-memoize, or restructure it to satisfy the compiler. Since this codebase has React Compiler enabled, we'll strip `React.useMemo` and let the compiler handle the optimization natively, or structure it functionally.
