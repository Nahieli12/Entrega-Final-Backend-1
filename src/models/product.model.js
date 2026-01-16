import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"; // Necesario para los filtros y paginación

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true }, // Los profesores suelen pedir descripción
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        category: { type: String, required: true }, // Necesario para poder filtrar por categoría
        status: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

// Aplicamos el plugin de paginación al esquema
productSchema.plugin(mongoosePaginate);

// El nombre debe ser "products" para que el carrito lo encuentre con el .populate()
const Product = mongoose.model("products", productSchema);

export default Product;