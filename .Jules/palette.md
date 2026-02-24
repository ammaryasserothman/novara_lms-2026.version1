## 2025-05-27 - Icon Buttons & Focus States
**Learning:** Icon-only buttons (like password toggles and tooltips) are often inaccessible to screen readers without explicit `aria-label` attributes. Additionally, using `focus:outline-none` without providing a visible replacement (e.g., `focus-visible:ring`) makes the UI unusable for keyboard-only users.
**Action:** Always verify icon-only buttons have meaningful `aria-label` and visible focus states (e.g., `focus-visible:ring-2`) during development.

## 2025-05-27 - Derived State vs Effects
**Learning:** Using `useEffect` to synchronize state (like password strength validation) causes cascading updates and potential UI flicker, impacting perceived performance.
**Action:** Use derived values calculated during render for synchronous validation logic instead of state effects.
