import express from "express";
import cors from "cors";
import songRoutes from "./routes/songRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", songRoutes);
app.use("/api", translateRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
