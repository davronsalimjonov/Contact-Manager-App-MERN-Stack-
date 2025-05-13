import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productController.js";
import { checkRole, validateToken } from "../middleware/validateTokenHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const productsRouter = express.Router();

productsRouter.use(validateToken);

productsRouter.route('/')
    .get(checkRole(['admin', 'user']), authMiddleware, getProducts) 
    .post(checkRole(['admin']), authMiddleware, createProduct);  

productsRouter.route('/:id')
    .get(checkRole(['admin', 'user']), authMiddleware, getProduct) 
    .put(checkRole(['admin']), authMiddleware, updateProduct)    
    .delete(checkRole(['admin']), authMiddleware, deleteProduct); 

export default productsRouter;
