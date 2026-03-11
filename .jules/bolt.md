
## 2024-05-28 - React Router v7 and Suspense
**Learning:** When using React Router v7 with `React.lazy`, `<Suspense>` must not be a direct child of `<Routes>` as it causes runtime errors. Furthermore, to prevent layouts from unmounting and flashing during lazy-loaded route transitions, the `<Suspense>` boundary should be placed inside the layout component (e.g., wrapping `{children}` in `AppLayout.tsx`).
**Action:** When adding route-based code splitting using `React.lazy` with React Router v7, always place the `<Suspense>` boundary inside the layout component, wrapping the route's children, rather than around the `<Routes>` or outside the layout.
