## 2025-02-28 - Optimize Calendar Grid Lookups
**Learning:** Nested array  inside a map loop over calendar days caused O(N*M) operations where N is days and M is events, creating an unnecessary rendering bottleneck.
**Action:** Used a single-pass loop with a  wrapped in  to pre-calculate daily events and upcoming deadlines, dropping complexity to O(N+M) and avoiding redundant allocations.
## 2025-02-28 - Optimize Calendar Grid Lookups
**Learning:** Nested array `.filter()` inside a map loop over calendar days caused O(N*M) operations where N is days and M is events, creating an unnecessary rendering bottleneck.
**Action:** Used a single-pass loop with a `Map` wrapped in `React.useMemo` to pre-calculate daily events and upcoming deadlines, dropping complexity to O(N+M) and avoiding redundant allocations.
## 2025-02-28 - Missing node_modules binaries
**Learning:** Running `npm run lint` threw `ERR_MODULE_NOT_FOUND: Cannot find package '@eslint/js'`, indicating the dependency was missing from `node_modules` even though the workspace was supposedly set up.
**Action:** Always run `npm i` before running linters or tests to ensure the `node_modules` folder and  symlinks are correctly populated, especially in environments where network timeouts or partial installs might leave it corrupted.
## 2025-02-28 - Missing node_modules binaries
**Learning:** Running `npm run lint` threw `ERR_MODULE_NOT_FOUND: Cannot find package '@eslint/js'`, indicating the dependency was missing from `node_modules` even though the workspace was supposedly set up.
**Action:** Always run `npm i` before running linters or tests to ensure the `node_modules` folder and `.bin` symlinks are correctly populated, especially in environments where network timeouts or partial installs might leave it corrupted.
