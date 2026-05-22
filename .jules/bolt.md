## 2024-05-20 - Playwright Icon Selectors
**Learning:** `lucide-react` icons (like Chevrons) used in UI buttons don't contain literal text characters (like `>`). Trying to locate them in Playwright tests using `.filter(has_text='>')` fails and causes tests to timeout.
**Action:** When testing UI components that rely heavily on SVG icons for interaction (like the Calendar next/prev month buttons), always rely on ARIA roles, accessible names (if provided), or other structural locators rather than text content.
