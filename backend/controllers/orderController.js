import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      first_name,
      last_name,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    } = req.body;

    const cart = await cartModel.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    let orderItems = [];
    let subtotal = 0;

    for (const item of cart.items) {
      const product = await productModel.findById(item.productId);

      if (!product) continue;

      orderItems.push({
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: item.size,
        quantity: item.quantity,
      });

      subtotal += product.price * item.quantity;
    }

    const shipping = 100;
    const totalAmount = subtotal + shipping;

    const newOrder = new orderModel({
      userId,
      items: orderItems,
      amount: totalAmount,
      shipping,
      first_name,
      last_name,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      paymentMethod: "COD",
      paymentStatus: "Pending",
    });

    await newOrder.save();

    await cartModel.findOneAndDelete({ userId });

    res.json({
      success: true,
      message: "Order placed successfully (COD)",
      orderId: newOrder._id,
    });

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId

    const orders = await orderModel
      .find({ userId })
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      orders,
    })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
