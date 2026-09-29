/*
 * Just the "is a Firebase project configured" check, with zero dependency on
 * the Firebase SDK itself. Components that need to decide whether to render
 * anything Firebase-related (e.g. ReviewForm) import this instead of
 * ./firebase, so that decision doesn't drag the ~160 KB SDK into every
 * page's bundle — only code that actually calls Firebase (adminApi.js)
 * imports ./firebase, and only once something dynamically imports it.
 */
export const firebaseReady = Boolean(
  process.env.REACT_APP_FIREBASE_API_KEY && process.env.REACT_APP_FIREBASE_PROJECT_ID
);

/**
 * Whether admin/review UI should render as functional (vs. a "not
 * configured" message): true once a real project exists, and also true in a
 * local dev build so the panel can be tried against mockApi.js's fake data.
 * Never true in a production build without a real project — see adminApi.js.
 */
export const backendAvailable = firebaseReady || process.env.NODE_ENV !== 'production';
