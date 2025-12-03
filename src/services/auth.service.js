import { auth, db } from "../config/firebase.js";

class AuthService {

  /**
   * Login a user by verifying email/password with Firebase Auth
   * IMPORTANT: Firebase Auth email/password login MUST happen
   * on the client side. The server cannot verify a password.
   *
   * Instead, the backend receives an ID token from the frontend.
   */
  async login({ idToken }) {
    try {
      // Verify the Firebase ID token
      const decoded = await auth.verifyIdToken(idToken);

      const uid = decoded.uid;

      // Get user profile from Firestore
      const userDoc = await db.collection("users").doc(uid).get();
      const userData = userDoc.exists ? userDoc.data() : null;

      return {
        uid,
        email: decoded.email,
        name: userData?.name || decoded.name || "",
        token: idToken, // return the same token the client provided
      };
    } catch (err) {
      throw new Error("Invalid login token");
    }
  }
}

export default new AuthService();
