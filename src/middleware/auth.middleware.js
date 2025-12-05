import { auth } from "../config/firebase.js";
import { UnauthorizedError } from "../utils/errors.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      throw new UnauthorizedError(
        "Formato de token inválido o faltante",
        "El token debe tener el formato: Bearer <token>"
      );
    }

    const idToken = header.split(" ")[1];

    // Verificar el token con Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(idToken);

    // Adjuntar la información del usuario al objeto req
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || null,
      role: decodedToken.role || null,
    };

    return next();
  } catch (error) {
    return next(error)
  }
};
