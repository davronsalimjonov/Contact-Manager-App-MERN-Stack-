import asyncHandler from "express-async-handler";
import ClothingProduct from "../models/productModel.js";
import { checkRole } from "../middleware/validateTokenHandler.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/images";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only JPEG, PNG, and JPG are allowed"));
    }
    cb(null, true);
};

export const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

const getProducts = asyncHandler(async (req, res) => {
    let query = {};

    if (req.user.role !== "admin") {
        query.stock = { $gt: 0 };
    }

    const products = await ClothingProduct.find(query);
    res.status(200).json(products);
});

const createProduct = [
    checkRole(["admin"]),
    upload.single('productImage'),
    asyncHandler(async (req, res) => {
        const { productName, size, price, description, stock } = req.body;

        if (!productName || !size || !price || !description || !req.file) {
            res.status(400);
            throw new Error("Please add all fields");
        }

        const imagePath = `/uploads/images/${req.file.filename}`;

        const product = await ClothingProduct.create({
            productName,
            size,
            price,
            description,
            stock,
            productImage: imagePath,
        });

        res.status(201).json(product);
    }),
];

const getProduct = asyncHandler(async (req, res) => {
    const product = await ClothingProduct.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.status(200).json({
        productName: product.productName,
        size: product.size,
        price: product.price,
        description: product.description,
        stock: product.stock,
        productImage: `${req.protocol}://${req.get("host")}${product.productImage}`,
    });
});

const updateProduct = [
    checkRole(["admin"]),
    upload.single('productImage'),
    asyncHandler(async (req, res) => {
        const product = await ClothingProduct.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        let imagePath = product.productImage;

        if (req.file) {
            imagePath = `/uploads/images/${req.file.filename}`;

            // Delete old image file if it exists
            const oldImagePath = path.join("uploads", "images", path.basename(product.productImage));
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const updatedProduct = await ClothingProduct.findByIdAndUpdate(
            req.params.id,
            {
                productName: req.body.productName,
                size: req.body.size,
                price: req.body.price,
                description: req.body.description,
                stock: req.body.stock,
                productImage: imagePath,
            },
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedProduct);
    }),
];

const deleteProduct = [
    checkRole(["admin"]),
    asyncHandler(async (req, res) => {
        const product = await ClothingProduct.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        const imagePath = path.join("uploads", "images", path.basename(product.productImage));
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await ClothingProduct.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    }),
];

export { getProducts, createProduct, getProduct, updateProduct, deleteProduct };
