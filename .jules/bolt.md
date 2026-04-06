## 2024-04-05 - Route-level code splitting with React.lazy
**Learning:** When adding `React.lazy` for heavy route sections, putting the `<React.Suspense>` boundary directly around the `{children}` in layout components like `AppLayout.tsx` prevents unmounting structural UI layout (sidebars, headers) while still splitting the large components properly.
**Action:** Place suspense boundaries deep enough in the layout to preserve global structure while preventing heavy feature eagerly importing on the First Contentful Paint.
