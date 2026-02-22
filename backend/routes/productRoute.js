import express from "express";
import { addProduct, removeProduct, listProduct, singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import protect from "../middleware/authAdmin.js";
import adminOnly from "../middleware/adminMiddleware.js";


const productRoute = express.Router()

productRoute.post('/add', protect,
  adminOnly,upload.fields([{name: 'image1', maxCount:1},{name: 'image2', maxCount:1},{name: 'image3', maxCount:1},{name: 'image4', maxCount:1},]), addProduct)
productRoute.post('/remove',protect, adminOnly ,removeProduct)
productRoute.post('/single', singleProduct)
productRoute.get('/list', listProduct)
productRoute.get('/single/:productId', singleProduct)

export default productRoute