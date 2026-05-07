## 2024-05-18 - Avoid repeated flatMap/findIndex array manipulations on renders
**Learning:** In React components like LessonPage, calculating sequential items (e.g. next/prev lesson) in nested structures using multiple chained \`.flatMap()\` and \`.findIndex()\` inside render bodies or event handlers causes massive unnecessary array allocations on every render and click, killing performance on larger arrays.
**Action:** Pre-calculate \`prevLessonId\` and \`nextLessonId\` simultaneously using a single-pass nested \`for...of\` loop to reduce algorithmic complexity and allocations.
