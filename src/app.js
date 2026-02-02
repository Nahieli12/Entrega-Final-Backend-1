import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"; 
import connectMongoDB from "./config/db.js";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const PORT = process.env.PORT || 8080;

connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
