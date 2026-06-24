## 2024-06-24 - Calendar Events O(N*D) Render Loop Anti-pattern
**Learning:** Calling \`.filter()\` on a large events array for every single day in the month view (31 times per render loop) results in an \`O(N*D)\` complexity that severely degrades React performance, taking 500ms+ for 5000 events.
**Action:** Always pre-group event data using a Map indexed by day inside a single \`React.useMemo()\` block (\`O(N)\` complexity), and perform an \`O(1)\` lookup in the render loop to keep the UI fast. Also return static empty array constants to avoid inline allocation and reference instability.
