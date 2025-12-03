import { auth } from "../config/firebase.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Missing or invalid authorization header" });
    }

    const idToken = header.split(" ")[1];

    // Verify Firebase ID token
    const decodedToken = await auth.verifyIdToken(idToken);

    // Attach user info to the request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      role: decodedToken.role || null, // optional custom claims
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
