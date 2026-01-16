import express from "express";
import Product from "../models/product.model.js";
import { getAllProducts, addProduct, setProductById, deleteProductById} from "../controllers/products.controller.js"

const productsRouter = express.Router();

// --- GET ---
productsRouter.get("/", getAllProducts);

// --- POST ---
productsRouter.post("/", addProduct); // <--- AQUÍ ESTABA EL ERROR, faltaba cerrar bien esta llave y paréntesis

// --- PUT ---
productsRouter.put("/:pid", setProductById);

productsRouter.delete("/:pid", deleteProductById);

export default productsRouter;