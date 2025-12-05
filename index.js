import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productsRoutes from "./src/routes/products.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./src/middleware/errors.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", productsRoutes);
app.use("/auth", authRoutes);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a TechLab Products API",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      auth: "/auth/login",
    },
    testUser: {
      email: "admin@admin.com",
      password: "admin123",
    },
    success: true,
  });
});

//app.use(methodNotAllowed);


app.use(notFoundHandler);
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
