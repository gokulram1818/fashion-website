import express from "express";
import { placeOrderCOD,getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import authUser from "../middleware/authUser.js";
import protect from "../middleware/authAdmin.js";
import adminOnly from "../middleware/adminMiddleware.js";

const orderRouter = express.Router()

orderRouter.post("/place-cod", authUser, placeOrderCOD)
orderRouter.get("/user-orders", authUser, getUserOrders)
orderRouter.get("/all", protect,adminOnly,getAllOrders)
orderRouter.post("/update-status", protect, adminOnly, updateOrderStatus)


export default orderRouter;
