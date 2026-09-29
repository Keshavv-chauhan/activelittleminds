/*
 * Firebase app initialisation, shared by the admin panel and the public
 * review form. Configuration comes from REACT_APP_FIREBASE_* environment
 * variables (see .env.local.example) — never hard-code real values here,
 * they end up in the public JS bundle.
 *
 * The values below are not secret (they identify the project, not
 * authenticate it — real access control lives in firestore.rules), but they
 * do need to point at the real project to work, so they are kept out of git
 * via .env.local and supplied at build time instead.
 */
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseReady } from './firebaseConfig';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = firebaseReady
  ? getApps()[0] || initializeApp(config)
  : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
