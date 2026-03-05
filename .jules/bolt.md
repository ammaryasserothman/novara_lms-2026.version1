
## 2023-10-27 - Early returns and useMemo with context
**Learning:** React rules of hooks prohibit early returns before useMemo hooks. In heavily context-driven dashboards, memoizing derived states using `courses` and `enrollments` requires internal null checks within the useMemo block to avoid crashes before the early return kicks in. Also, unmemoized context getters (like `getRecommendedCourses`) that return fresh arrays should be wrapped in useMemo using context values as dependencies to avoid stale closures.
**Action:** Always place `if (!user) return null;` strictly AFTER all useMemo blocks. Supply safe fallback values inside useMemo `if (!user || !data) return fallback;` when accessing context objects.
