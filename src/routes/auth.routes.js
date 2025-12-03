import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

/**
 * Rutas de Autenticación
 */

// POST /auth/login - Autenticar usuario
router.post("/login", AuthController.login.bind(AuthController));

export default router;
