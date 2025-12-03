import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const JWT_EXPIRATION = "24h";

/**
 * Genera un token JWT
 * @param {Object} payload - Datos a incluir en el token
 * @returns {String} Token JWT
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

/**
 * Verifica y decodifica un token JWT
 * @param {String} token - Token a verificar
 * @returns {Object} Payload del token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};
