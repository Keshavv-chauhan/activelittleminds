/*
 * All Firestore/Auth calls the admin panel and the public review form make,
 * in one place. Real access control is enforced server-side by
 * firestore.rules (only a signed-in admin can write to `posts`, and only an
 * admin can approve/delete a `review` or read unapproved ones) — this file
 * just wraps the SDK calls, it is not itself the security boundary.
 */
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { firebaseReady } from '../firebaseConfig';

const NOT_CONFIGURED =
  'Firebase is not configured yet. Add the project values to .env.local (see .env.local.example) and restart the dev server.';

function assertReady() {
  if (!firebaseReady) throw new Error(NOT_CONFIGURED);
}

// ---------- Auth ----------

export function signIn(email, password) {
  assertReady();
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutAdmin() {
  assertReady();
  return signOut(auth);
}

/** Calls back with the Firebase user, or null when signed out. */
export function watchAuth(callback) {
  if (!firebaseReady) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

// ---------- Posts ----------
// Shape: { title, slug, excerpt, body, category, seoTitle, seoDescription,
//          published, createdAt, updatedAt }

export async function listPosts() {
  assertReady();
  const snap = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function createPost(data) {
  assertReady();
  return addDoc(collection(db, 'posts'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function updatePost(id, data) {
  assertReady();
  return updateDoc(doc(db, 'posts', id), { ...data, updatedAt: serverTimestamp() });
}

export function deletePost(id) {
  assertReady();
  return deleteDoc(doc(db, 'posts', id));
}

// ---------- Reviews ----------
// Shape: { quote, source, rating, approved, createdAt }

/** Anyone can call this — it always lands as unapproved, pending a moderator. */
export function submitReview({ quote, source, rating }) {
  assertReady();
  return addDoc(collection(db, 'reviews'), {
    quote,
    source,
    rating: rating || null,
    approved: false,
    createdAt: serverTimestamp(),
  });
}

/** Public: only approved reviews, newest first. Used on the homepage. */
export async function listApprovedReviews() {
  assertReady();
  const snap = await getDocs(
    query(collection(db, 'reviews'), where('approved', '==', true), orderBy('createdAt', 'desc'))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Admin: every review, so pending ones can be moderated. */
export async function listAllReviews() {
  assertReady();
  const snap = await getDocs(query(collection(db, 'reviews'), orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function setReviewApproved(id, approved) {
  assertReady();
  return updateDoc(doc(db, 'reviews', id), { approved });
}

export function deleteReview(id) {
  assertReady();
  return deleteDoc(doc(db, 'reviews', id));
}
