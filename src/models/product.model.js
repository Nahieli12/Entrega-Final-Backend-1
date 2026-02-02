import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"; // Necesario para los filtros y paginación

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true }, 
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


productSchema.plugin(mongoosePaginate);


const Product = mongoose.model("products", productSchema);

export default Product;