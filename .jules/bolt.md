
## 2025-03-05 - [Rules of Hooks violation due to early return]
**Learning:** `Dashboard.tsx` violated the Rules of Hooks by having an early return (`if (!user) return null;`) *before* hooks like `useMemo` were called in prior versions. Also, the linter complained about `useGlobal` and `useNavigate` if they were somehow considered conditionally called.
**Action:** Move early returns strictly *after* all hook calls. When using `useMemo` blocks that rely on conditionally available data (like `user`), include safety checks inside the `useMemo` callback itself (`if (!user || !data) return null;`) to prevent runtime crashes.
