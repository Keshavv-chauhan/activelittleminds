/*
 * An in-memory stand-in for Firestore/Auth, seeded with fake data, so the
 * admin panel and review form can be tried end-to-end before a real Firebase
 * project exists. adminApi.js switches to this automatically — see the
 * `useMock` check there — and ONLY in a local dev build (`npm start`); a
 * production build with no Firebase configured falls back to the plain
 * "not configured" message instead, so a real visitor can never hit this.
 *
 * State lives only in this tab's memory: it resets on every reload and never
 * touches a network. Nothing here is real data.
 */

const DEMO_UID = 'demo-admin';
const DEMO_EMAIL = 'demo@activelittleminds.com';

let nextId = 1;
const id = () => String(nextId++);

const daysAgo = (n) => new Date(Date.now() - n * 86400000);

let posts = [
  {
    id: id(),
    title: 'Five signs of speech delay parents often miss',
    slug: 'five-signs-of-speech-delay',
    category: 'Speech & Language',
    excerpt: 'The early signals are quieter than most parents expect — here is what to watch for before age three.',
    body: 'This is sample body text for the demo admin panel.\n\nIt is only visible locally, seeded so the Posts tab has something to edit and delete.',
    seoTitle: '',
    seoDescription: '',
    published: true,
    createdAt: daysAgo(3),
  },
  {
    id: id(),
    title: 'Setting up a sensory-friendly corner at home',
    slug: 'sensory-friendly-corner-at-home',
    category: 'Occupational Therapy',
    excerpt: 'A calm-down space does not need special equipment — three things matter more than the rest.',
    body: 'Sample body text.\n\nThis draft post has never been published — try toggling it live from the editor.',
    seoTitle: '',
    seoDescription: '',
    published: false,
    createdAt: daysAgo(1),
  },
];

let reviews = [
  {
    id: id(),
    quote: 'The therapists genuinely know our son by name and by story, not just by his file. That made all the difference.',
    source: 'Demo Parent — Priya S.',
    rating: 5,
    approved: true,
    createdAt: daysAgo(6),
  },
  {
    id: id(),
    quote: "We saw real progress in his attention span within a month of starting occupational therapy here.",
    source: 'Demo Parent — Arjun M.',
    rating: 5,
    approved: true,
    createdAt: daysAgo(4),
  },
  {
    id: id(),
    quote: 'Booking was easy and the first consultation was unhurried. Still waiting to see longer-term results.',
    source: 'Demo Parent — Neha K.',
    rating: 4,
    approved: false, // pending — try approving it from the Reviews tab
    createdAt: daysAgo(0.2),
  },
];

// ---------- Auth ----------

let currentUser = null;
const listeners = new Set();
const notify = () => listeners.forEach((cb) => cb(currentUser));

export function mockSignIn(email, password) {
  if (!email || !password) {
    return Promise.reject(new Error('Enter an email and password (demo mode accepts anything).'));
  }
  currentUser = { uid: DEMO_UID, email: email || DEMO_EMAIL };
  notify();
  return Promise.resolve({ user: currentUser });
}

export function mockSignOut() {
  currentUser = null;
  notify();
  return Promise.resolve();
}

export function mockWatchAuth(callback) {
  listeners.add(callback);
  callback(currentUser);
  return () => listeners.delete(callback);
}

// ---------- Posts ----------

const byNewest = (a, b) => b.createdAt - a.createdAt;

export function mockListPosts() {
  return Promise.resolve([...posts].sort(byNewest));
}

export function mockCreatePost(data) {
  posts = [{ id: id(), ...data, createdAt: new Date() }, ...posts];
  return Promise.resolve();
}

export function mockUpdatePost(postId, data) {
  posts = posts.map((p) => (p.id === postId ? { ...p, ...data } : p));
  return Promise.resolve();
}

export function mockDeletePost(postId) {
  posts = posts.filter((p) => p.id !== postId);
  return Promise.resolve();
}

// ---------- Reviews ----------

export function mockSubmitReview({ quote, source, rating }) {
  reviews = [{ id: id(), quote, source, rating: rating || null, approved: false, createdAt: new Date() }, ...reviews];
  return Promise.resolve();
}

export function mockListApprovedReviews() {
  return Promise.resolve(reviews.filter((r) => r.approved).sort(byNewest));
}

export function mockListAllReviews() {
  return Promise.resolve([...reviews].sort(byNewest));
}

export function mockSetReviewApproved(reviewId, approved) {
  reviews = reviews.map((r) => (r.id === reviewId ? { ...r, approved } : r));
  return Promise.resolve();
}

export function mockDeleteReview(reviewId) {
  reviews = reviews.filter((r) => r.id !== reviewId);
  return Promise.resolve();
}
