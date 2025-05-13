import mongoose from "mongoose";

export const clothingProductSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    productName: {
        type: String,
        required: [true, "Please add a product name"],
    },
    size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL"],
        required: [true, "Please add a size"],
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
    stock: {
        type: Number,
        default: 0,
    },
    productImage: {
        type: String,
        required: [true, "Please add a product image URL"],
    }
},
{
    timestamps: true,
});

const ClothingProduct = mongoose.model("ClothingProduct", clothingProductSchema);

export default ClothingProduct;
