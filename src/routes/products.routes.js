import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { methodNotAllowedHandler } from "../middleware/errors.middleware.js";

const router = Router();

/**
 * Rutas de Productos
 * Todas las rutas están protegidas con verificación de token Firebase
 */

// GET /api/products - Obtener todos los productos
router.get("/", verifyAuth, ProductsController.getAll.bind(ProductsController));
// POST /api/products/create - Crear un nuevo producto
router.post(
  "/create",
  verifyAuth,
  ProductsController.create.bind(ProductsController)
);
// Manejar métodos no permitidos en /create
router.get("/create", methodNotAllowedHandler);
router.put("/create", methodNotAllowedHandler);
router.delete("/create", methodNotAllowedHandler);

// GET /api/products/:id - Obtener un producto por ID
router.get(
  "/:id",
  verifyAuth,
  ProductsController.getById.bind(ProductsController)
);

// PUT /api/products/:id - Actualizar un producto
router.put(
  "/:id",
  verifyAuth,
  ProductsController.update.bind(ProductsController)
);

// DELETE /api/products/:id - Eliminar un producto
router.delete(
  "/:id",
  verifyAuth,
  ProductsController.delete.bind(ProductsController)
);

export default router;
