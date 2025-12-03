import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productsRoutes from "./src/routes/products.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

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
  });
});

// Middleware para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `La ruta ${req.method} ${req.url} no existe en este servidor`,
    status: 404,
  });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error("Error:", err);

  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";

  res.status(status).json({
    error: message,
    status: status,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
