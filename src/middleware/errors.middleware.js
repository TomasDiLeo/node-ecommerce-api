import { AppError } from "../utils/errors.js";

/**
 * Middleware para rutas no encontradas (404)
 * Debe colocarse antes del errorHandler
 */
export const notFoundHandler = (req, res, next) => {
  const error = new AppError(
    "Ruta no encontrada",
    404,
    `La ruta ${req.method} ${req.originalUrl} no existe en este servidor`
  );
  next(error);
};

/**
 * Middleware para métodos no permitidos (405)
 * Uso: app.all('/ruta', methodNotAllowedHandler)
 */
export const methodNotAllowedHandler = (req, res, next) => {
  const error = new AppError(
    "Método no permitido",
    405,
    `El método ${req.method} no está permitido para ${req.originalUrl}`
  );
  next(error);
};

/**
 * Middleware principal de manejo de errores
 */
export const errorHandler = (err, req, res, next) => {
  
  // Si es un error operacional conocido (AppError o heredados)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      detail: err.detail,
      statusCode: err.statusCode,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Manejo de errores específicos de Firebase
  if (err.code === "auth/id-token-expired") {
    return res.status(401).json({
      success: false,
      error: "Token expirado",
      detail: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
      statusCode: 401,
    });
  }

  if (err.code === "auth/argument-error") {
    return res.status(401).json({
      success: false,
      error: "Token inválido",
      detail: "El token de autenticación proporcionado no es válido",
      statusCode: 401,
    });
  }

  // Manejo de errores de Firestore
  if (err.code === 5) {
    // NOT_FOUND en Firestore
    return res.status(404).json({
      success: false,
      error: "Recurso no encontrado",
      detail: "El recurso solicitado no existe en la base de datos",
      statusCode: 404,
    });
  }

  return res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    detail:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Ocurrió un error inesperado.",
    statusCode: 500,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * Wrapper para funciones async en rutas
 * Evita tener que usar try-catch en cada controlador
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
