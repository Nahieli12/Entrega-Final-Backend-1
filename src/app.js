import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"; // Importas el nuevo router
import connectMongoDB from "./config/db.js";
import { configDotenv } from "dotenv";

configDotenv(); // Carga las variables del .env

const app = express();
const PORT = process.env.PORT || 8080;

connectMongoDB(); // Conecta a la base de datos

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter); // Sumas la ruta de carritos

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
