// In src/lib/firebaseAdmin.ts

import admin from 'firebase-admin';

// This line loads the key file you just downloaded (if present)
let serviceAccount: any = undefined;
try {
  // keep require wrapped to avoid build-time errors when file missing
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  serviceAccount = require('../../firebase-admin-sdk.json');
} catch (err) {
  // file not present — will fall back depending on env
}

let adminInitError: any = null;
if (!admin.apps.length) {
  try {
    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      // If no serviceAccount file, try application default credentials.
      admin.initializeApp();
    }
  } catch (error) {
    adminInitError = error;
    console.error('Firebase admin initialization error', error);
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export default admin;

// Safe helper for routes that rely on Firebase Auth. In dev you can set
// `FIREBASE_DEV_FALLBACK=true` in your environment to allow the server to
// continue working (it will return a fake user object) when the Admin SDK
// cannot contact Google (invalid key, time skew, etc.). This avoids the
// app crashing and makes debugging easier.
export async function getOrCreateFirebaseUserByEmail(email: string) {
  try {
    // Try to get existing user
    const user = await adminAuth.getUserByEmail(email);
    return user;
  } catch (err: any) {
    // If user not found, try to create
    if (err && err.code === 'auth/user-not-found') {
      try {
        const created = await adminAuth.createUser({ email });
        return created;
      } catch (createErr) {
        // fall through to fallback handling
        err = createErr;
      }
    }

    // If Admin SDK failed for other reasons (invalid_grant etc.) and
    // developer opted into fallback, return a minimal fake user object.
    const allowFallback =
      process.env.FIREBASE_DEV_FALLBACK === 'true' ||
      process.env.NEXT_PUBLIC_FIREBASE_DEV_FALLBACK === 'true';

    if (allowFallback) {
      console.warn(
        '[firebaseAdmin] Admin SDK failed, returning development fallback user. Original error:',
        err?.message || err
      );

      // Return shape similar to Firebase UserRecord for downstream code
      return {
        uid: `dev:${email}`,
        email,
        emailVerified: false,
        disabled: false,
      } as any;
    }

    // If no fallback allowed, rethrow to be handled by the caller
    throw err;
  }
}