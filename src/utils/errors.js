/**
 * Clase base para errores personalizados de la aplicación
 */
class AppError extends Error {
  constructor(message, statusCode = 500, detail = null) {
    super(message);
    this.statusCode = statusCode;
    this.detail = detail;
    this.success = false;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error 400 - Solicitud incorrecta
 */
class BadRequestError extends AppError {
  constructor(message = "Solicitud incorrecta", detail = null) {
    super(message, 400, detail);
  }
}

/**
 * Error 401 - No autorizado
 */
class UnauthorizedError extends AppError {
  constructor(message = "No autorizado", detail = null) {
    super(message, 401, detail);
  }
}

/**
 * Error 403 - Prohibido
 */
class ForbiddenError extends AppError {
  constructor(message = "Acceso prohibido", detail = null) {
    super(message, 403, detail);
  }
}

/**
 * Error 404 - No encontrado
 */
class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado", detail = null) {
    super(message, 404, detail);
  }
}

/**
 * Error 405 - Método no permitido
 */
class MethodNotAllowedError extends AppError {
  constructor(message = "Método no permitido", detail = null) {
    super(message, 405, detail);
  }
}

/**
 * Error 409 - Conflicto
 */
class ConflictError extends AppError {
  constructor(message = "Conflicto en la operación", detail = null) {
    super(message, 409, detail);
  }
}

/**
 * Error 422 - Entidad no procesable (validación)
 */
class ValidationError extends AppError {
  constructor(message = "Error de validación", detail = null) {
    super(message, 422, detail);
  }
}

/**
 * Error 500 - Error interno del servidor
 */
class InternalServerError extends AppError {
  constructor(message = "Error interno del servidor", detail = null) {
    super(message, 500, detail);
  }
}

export {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  ConflictError,
  ValidationError,
  InternalServerError,
};
