## 2025-02-28 - Initializing Bolt Journal
**Learning:** Found an opportunity to use React.lazy for code splitting to improve initial bundle size and loading speed. The memory stated that route-based code splitting is implemented in App.tsx using React.lazy for heavy features, but looking at App.tsx, they are all currently eagerly imported.
**Action:** Implement React.lazy for all routes, except for the Landing page.

## 2025-02-28 - React Router v7 & Suspense Pitfalls
**Learning:** When adding `React.lazy` code splitting, `<Suspense>` cannot be a direct child of `<Routes>`. It will cause a fatal runtime error. Furthermore, wrapping the entire `<Routes>` component in `<Suspense>` causes the main layout (`AppLayout`) to unmount and flash during chunk loading on navigation.
**Action:** Always place the `<Suspense>` boundary *inside* the layout component (e.g., around `{children}` in `AppLayout.tsx`) to persist the layout shell while the lazy route loads. For routes outside the main layout, use `<Route element={<Suspense fallback={...} />}>`.
