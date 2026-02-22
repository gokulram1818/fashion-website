import cartModel from "../models/cartModel.js"

import productModel from "../models/productModel.js"

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId; 
    const { productId, size } = req.body;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({
        userId,
        items: [{ productId, size, quantity: 1 }]
      })
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.productId === productId && item.size === size
      )

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, size, quantity: 1 });
      }
    }

    await cart.save();
    res.json({ success: true, message: "Added to cart" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


export const getCart = async (req, res) => {
  try {
    const userId = req.userId

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.json({ success: true, items: [] });
    }

    const cartItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await productModel.findById(item.productId);

        return {
          product,
          size: item.size,
          quantity: item.quantity
        };
      })
    );

    res.json({ success: true, items: cartItems });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, size, quantity } = req.body;

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId === productId && item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
    }

    res.json({ success: true, message: "Quantity updated" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, size } = req.body;

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => !(item.productId === productId && item.size === size)
    );

    await cart.save();

    res.json({ success: true, message: "Item removed" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



