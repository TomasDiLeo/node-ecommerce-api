import fetch from "node-fetch";
import { BadRequestError, UnauthorizedError } from "../utils/errors.js";

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new BadRequestError(
          "Campos requeridos faltantes",
          "Asegúrate de proporcionar tanto el correo electrónico como la contraseña de la siguiente forma {\"email\": \"tu_email\", \"password\": \"tu_contraseña\"}"
        );
      }

      const apiKey = process.env.FIREBASE_API_KEY;

      // Llamada a la API de Firebase Auth para login
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

      //Acceso denegado
      if (data.error) {
        //Traduccion de errores de Firebase Auth
        const errorMessages = {
          EMAIL_NOT_FOUND: "Usuario no encontrado",
          INVALID_PASSWORD: "Contraseña incorrecta",
          USER_DISABLED: "Usuario deshabilitado",
          INVALID_LOGIN_CREDENTIALS: "Credenciales inválidas",
        };

        const message =
          errorMessages[data.error.message] || "Error de autenticación";
        const detail = "Verifica tus credenciales e intenta nuevamente";
        throw new UnauthorizedError(message, detail);
      }

      //Login exitoso
      return res.json({
        message: "Login successful",
        token: data.idToken,
        expiresIn: data.expiresIn,
        user: {
          localId: data.localId,
          email: data.email,
        },
        sucess: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
