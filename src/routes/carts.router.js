import { Router } from "express";
import { cartModel } from "../models/cart.model.js";

const router = Router();

// 1. Crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const newCart = await cartModel.create({ products: [] });
        res.status(201).send({ status: "success", payload: newCart });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al crear el carrito" });
    }
});

// 2. AGREGAR O ACTUALIZAR producto (ESTA ES LA RUTA QUE USARÁS EN POSTMAN)
router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body;

        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).send({ status: "error", message: "Carrito no encontrado" });

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        await cart.save();
        const updatedCart = await cartModel.findById(cid).populate("products.product");
        
        res.send({ status: "success", payload: updatedCart });
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).send({ status: "error", message: "Error al procesar el producto" });
    }
});

// 3. Obtener carrito con POPULATE
router.get("/:cid", async (req, res) => {
    try {
        const cart = await cartModel.findById(req.params.cid).populate("products.product");
        if (!cart) return res.status(404).send({ status: "error", message: "Carrito no encontrado" });
        res.send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al obtener el carrito" });
    }
});

export default router;