import express from "express";
import { addToCart, getCart, updateCartQuantity, removeFromCart } from "../controllers/cartController.js";
import authUser from "../middleware/authUser.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.get("/get", authUser, getCart);
cartRouter.post("/update", authUser, updateCartQuantity);
cartRouter.post("/remove", authUser, removeFromCart);


export default cartRouter;
