## 2024-11-20 - Memoizing derived arrays in CertificatesPage
**Learning:** `earnedCertificates` and `lockedCertificates` are being recalculated on every render (e.g. when typing in the search bar or changing `selectedCert`), doing multiple array iterations and finds inside `CertificatesPage.tsx`. This causes unnecessary computation and garbage collection.
**Action:** Wrap the derivation logic in a single `useMemo` block to memoize the result so it only recalculates when `courses` or `enrollments` change.
