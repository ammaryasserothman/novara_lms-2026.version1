
## 2024-07-04 - Optimize Calendar Rendering with Map and Memoization
**Learning:** Rendering a calendar view by filtering all events per day inside the render loop causes an O(N*D) operation, which can degrade performance as the number of events grows. Additionally, sorting operations directly within component body forces expensive O(N log N) recalculations on every render.
**Action:** Use a Map within `React.useMemo` to pre-group events by day for O(1) lookups during rendering. Memoize expensive array operations like `.sort()` and `.filter()` to ensure they only re-run when their dependencies change, preserving React reference stability by using a static `EMPTY_EVENTS` fallback.

## 2024-07-04 - Static Fallback Referencing inside Components
**Learning:** When using static fallback properties (like an empty array fallback `const EMPTY_EVENTS: typeof EVENTS = [];`) inside the component's body, it creates a new reference on each render, breaking referential equality and triggering unneeded recalculations downstream.
**Action:** Always move static, non-changing primitive declarations or empty fallbacks outside the component scope to genuinely preserve referential stability.
