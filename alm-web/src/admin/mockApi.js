/*
 * A localStorage-backed stand-in for Firestore/Auth, seeded with fake data,
 * so the admin panel and review form can be tried end-to-end before a real
 * Firebase project exists. adminApi.js switches to this automatically — see
 * the `useMock` check there — and ONLY in a local dev build (`npm start`); a
 * production build with no Firebase configured falls back to the plain
 * "not configured" message instead, so a real visitor can never hit this.
 *
 * Persisted to this browser's localStorage (not a network, not shared with
 * anyone else) so it survives the page reload that a typed URL always causes
 * — e.g. submitting the contact form, then loading /admin-login to check it,
 * which is the normal way to use this since that link is deliberately not
 * in the nav. Nothing here is real data; clear it any time with
 * localStorage.removeItem('alm-admin-mock-v1') in the browser console.
 */

const STORAGE_KEY = 'alm-admin-mock-v1';
const DEMO_EMAIL = 'demo@activelittleminds.com';

const daysAgo = (n) => new Date(Date.now() - n * 86400000);

function seedState() {
  let nextId = 1;
  const id = () => String(nextId++);
  return {
    posts: [
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
    ],
    reviews: [
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
    ],
    enquiries: [
      {
        id: id(),
        name: 'Demo Parent — Kavita R.',
        phone: '+91 98765 43210',
        childAge: '4',
        service: 'Speech & Language Therapy',
        message: 'My son is not combining words yet, was told to get an assessment.',
        status: 'new',
        createdAt: daysAgo(0.1),
      },
      {
        id: id(),
        name: 'Demo Parent — Vikram T.',
        phone: '+91 91234 56789',
        childAge: '6',
        service: 'Occupational Therapy & Sensory Integration',
        message: 'Looking for help with handwriting and sitting still in class.',
        status: 'contacted',
        createdAt: daysAgo(2),
      },
    ],
    nextIdCounter: nextId,
  };
}

const DATE_FIELDS = new Set(['createdAt']);

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) throw new Error('no stored state');
    const parsed = JSON.parse(raw);
    for (const list of [parsed.posts, parsed.reviews, parsed.enquiries]) {
      for (const item of list) {
        for (const field of DATE_FIELDS) {
          if (item[field]) item[field] = new Date(item[field]);
        }
      }
    }
    return parsed;
  } catch {
    const seeded = seedState();
    persist(seeded);
    return seeded;
  }
}

function persist(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private browsing / storage disabled: demo still works for this load,
    // just won't survive a reload. Not worth surfacing to the user.
  }
}

const state = load();
const nextId = () => String(state.nextIdCounter++);
const save = () => persist(state);

// ---------- Auth ----------
// Deliberately NOT persisted — a fresh page load should require signing in
// again, same as a real session would eventually expire.

let currentUser = null;
const listeners = new Set();
const notify = () => listeners.forEach((cb) => cb(currentUser));

export function mockSignIn(email, password) {
  if (!email || !password) {
    return Promise.reject(new Error('Enter an email and password (demo mode accepts anything).'));
  }
  currentUser = { uid: 'demo-admin', email: email || DEMO_EMAIL };
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

const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

export function mockListPosts() {
  return Promise.resolve([...state.posts].sort(byNewest));
}

export function mockCreatePost(data) {
  state.posts = [{ id: nextId(), ...data, createdAt: new Date() }, ...state.posts];
  save();
  return Promise.resolve();
}

export function mockUpdatePost(postId, data) {
  state.posts = state.posts.map((p) => (p.id === postId ? { ...p, ...data } : p));
  save();
  return Promise.resolve();
}

export function mockDeletePost(postId) {
  state.posts = state.posts.filter((p) => p.id !== postId);
  save();
  return Promise.resolve();
}

// ---------- Reviews ----------

export function mockSubmitReview({ quote, source, rating }) {
  state.reviews = [
    { id: nextId(), quote, source, rating: rating || null, approved: false, createdAt: new Date() },
    ...state.reviews,
  ];
  save();
  return Promise.resolve();
}

export function mockListApprovedReviews() {
  return Promise.resolve(state.reviews.filter((r) => r.approved).sort(byNewest));
}

export function mockListAllReviews() {
  return Promise.resolve([...state.reviews].sort(byNewest));
}

export function mockSetReviewApproved(reviewId, approved) {
  state.reviews = state.reviews.map((r) => (r.id === reviewId ? { ...r, approved } : r));
  save();
  return Promise.resolve();
}

export function mockDeleteReview(reviewId) {
  state.reviews = state.reviews.filter((r) => r.id !== reviewId);
  save();
  return Promise.resolve();
}

// ---------- Enquiries ----------

export function mockSubmitEnquiry({ name, phone, childAge, service, message }) {
  state.enquiries = [
    { id: nextId(), name, phone, childAge: childAge || null, service: service || null, message: message || null, status: 'new', createdAt: new Date() },
    ...state.enquiries,
  ];
  save();
  return Promise.resolve();
}

export function mockListEnquiries() {
  return Promise.resolve([...state.enquiries].sort(byNewest));
}

export function mockSetEnquiryStatus(enquiryId, status) {
  state.enquiries = state.enquiries.map((e) => (e.id === enquiryId ? { ...e, status } : e));
  save();
  return Promise.resolve();
}

export function mockDeleteEnquiry(enquiryId) {
  state.enquiries = state.enquiries.filter((e) => e.id !== enquiryId);
  save();
  return Promise.resolve();
}
