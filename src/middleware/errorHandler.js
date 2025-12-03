/**
 * Middleware para manejo centralizado de errores
 */
export const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", err);

  // Error de validación
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Error de validación",
      message: err.message,
      status: 400,
    });
  }

  // Error de Firebase
  if (err.code && err.code.startsWith("firebase")) {
    return res.status(500).json({
      error: "Error en el servicio de datos",
      message: "No se pudo conectar con la base de datos",
      status: 500,
    });
  }

  // Error de JWT
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(403).json({
      error: "Token inválido",
      message: err.message,
      status: 403,
    });
  }

  // Error genérico del servidor
  res.status(err.status || 500).json({
    error: err.message || "Error interno del servidor",
    status: err.status || 500,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
