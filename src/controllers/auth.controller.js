import fetch from "node-fetch";

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    try {
      const apiKey = process.env.FIREBASE_API_KEY;

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        return res.status(401).json({ error: data.error.message });
      }

      return res.json({
        message: "Login successful",
        token: data.idToken,
        user: {
          localId: data.localId,
          email: data.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

export default AuthController;
