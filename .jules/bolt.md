## 2024-10-24 - Calendar View Bottleneck
**Learning:** React render loops calling an O(N) array filter for every single day in a calendar view creates an invisible O(N*D) algorithmic complexity that blocks the main thread during month navigation or filter changes.
**Action:** When filtering or transforming relational collections based on dates in React components, combine these derivations into a single-pass loop within a React.useMemo block and pre-calculate external mappings using a Map for O(1) lookups inside the render block.
