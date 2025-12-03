import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  const decoded = Buffer.from(
    process.env.FIREBASE_SERVICE_ACCOUNT,
    "base64"
  ).toString("utf8");

  serviceAccount = JSON.parse(decoded);
} else {
  throw new Error(
    "Missing FIREBASE_SERVICE_ACCOUNT environment variable"
  );
}

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export Admin Auth + Firestore
const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
export default admin;
