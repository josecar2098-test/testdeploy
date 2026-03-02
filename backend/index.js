const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// 🌐 API de ejemplo
app.get("/api/test", (req, res) => {
  res.json({ message: "Hola desde el backend 🚀" });
});

// 👇 Servir frontend en producción
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  // Servir archivos estáticos
  app.use(express.static(frontendPath));

  // Solo redirigir al index.html rutas que **no sean /api**
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// 🔹 Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});