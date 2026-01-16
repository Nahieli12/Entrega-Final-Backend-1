import Product from "../models/product.model.js";
import { throwHttpError } from "../utils/httpError.js";

export const getAllProducts = async (req, res, next) => {
    try {
        // 1. Extraemos los parámetros de la URL con valores por defecto
        let { limit = 10, page = 1, sort, query } = req.query;

        // 2. Construcción del filtro (Objetivo: Filtros)
        // Permite filtrar por categoría o por disponibilidad si se pasa en la URL
        let filter = {};
        if (query) {
            filter = { $or: [ { category: query }, { status: query === 'true' } ] };
        }

        // 3. Configuración de opciones (Objetivo: Paginación y Ordenamiento)
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
            lean: true
        };

        // 4. Ejecución de la paginación
        const result = await Product.paginate(filter, options);

        // 5. Formato de respuesta profesional (lo que suelen pedir en la consigna)
        res.status(200).json({
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
            nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null
        });

    } catch (error) {
        next(error);
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const { title, price, stock, category, description } = req.body;
        // Agregué category y description porque el modelo profesional los necesita para filtrar
        if (!title || !price || !stock || !category) {
            return res.status(400).json({ status: "error", message: "Faltan campos obligatorios (incluyendo categoría)" });
        }
        const newProduct = await Product.create({ title, price, stock, category, description });
        res.status(201).json({ status: "success", payload: newProduct });
    } catch (error) {
        next(error);
    }
};

export const setProductById = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true });
        
        if (!updatedProduct) throwHttpError("Producto no encontrado", 404);

        res.status(200).json({ status: "success", payload: updatedProduct });
    } catch (error) {
        next(error);
    }
};

export const deleteProductById = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(pid);
        
        if (!deletedProduct) throwHttpError("Producto no encontrado", 404);

        res.status(200).json({ status: "success", payload: deletedProduct });
    } catch (error) {
        next(error);
    }
};