## 2024-06-05 - Avoid .tsx files with node test runner
**Learning:** Node's native test runner with `--experimental-strip-types` cannot handle JSX syntax within `.tsx` files, leading to `ERR_UNKNOWN_FILE_EXTENSION`.
**Action:** Use `npx vitest run <filepath>` when executing frontend component tests in React repositories instead of `node --test`.
