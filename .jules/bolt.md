## 2026-04-30 - Pre-calculate sequential items in single pass without useMemo
**Learning:** React 19 Compiler automatically optimizes synchronous logic, so avoiding manual `useMemo` for sequential array relationships prevents compiler warnings while single-pass nested `for...of` loops fix multiple `flatMap` / `findIndex` traversals.
**Action:** Replace multiple `flatMap` and `findIndex` calls with a single-pass nested loop for sequential item calculation without wrapping in `useMemo`.
