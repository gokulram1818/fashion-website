import { useEffect, useState } from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/cart/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json();

      if (data.success) {
        setCartItems(data.items);
      }

      setLoading(false)
    } catch (error) {
      console.error("Cart Fetch Error:", error)
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart()
  }, [])

  const updateQuantity = async (productId, size, newQuantity) => {
    if (newQuantity < 1) return

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          size,
          quantity: newQuantity,
        }),
      });

      const data = await res.json();

      if (data.success) {
        fetchCart(); 
      }
    } catch (error) {
      console.error("Update Quantity Error:", error);
    }
  };

  const removeItem = async (productId, size) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          size,
        }),
      });

      const data = await res.json();

      if (data.success) {
        fetchCart()
      }
    } catch (error) {
      console.error("Remove Item Error:", error)
    }
  }

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  const shipping = 100;
  const subtotal = calculateSubtotal();
  const total = subtotal + shipping

  if (loading) {
    return <h2 className="text-center mt-5">Loading Cart...</h2>
  }

  return (
    <div className="container cart-top ">
      <h2 className="mb-4">Your Cart 🛒</h2>

      <div className="row">
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <h4>Your cart is empty</h4>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="row align-items-center border rounded p-3 mb-3 shadow-sm bg-white">
                <div className="col-md-2 col-4">
                  <img src={item.product.image[0]} alt={item.product.name} className="img-fluid rounded" />
                </div>

                <div className="col-md-4 col-8">
                  <h5 className="mb-1">{item.product.name}</h5>
                  <p className="text-muted mb-1">Size: {item.size}</p>
                  <p className="fw-bold mb-0">
                    ₹{item.product.price}
                  </p>
                </div>

                <div className="col-md-3 col-6 mt-3 mt-md-0 d-flex align-items-center">
                  <button className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.size,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>

                  <span className="mx-3 fw-bold">
                    {item.quantity}
                  </span>

                  <button className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.size,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <div className="col-md-3 col-6 text-end mt-3 mt-md-0">
                  <h5 className="mb-2">
                    ₹{item.product.price * item.quantity}
                  </h5>

                  <button className="btn btn-sm btn-outline-danger"
                    onClick={() =>
                      removeItem(item.product._id, item.size)
                    }
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="col-lg-4">
            <div className="card p-4 shadow-sm border-primary sticky-top">
              <h4 className="mb-4">Your Cart Summary</h4>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>₹{shipping}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold fs-5">Total:</span>
                <span className="fw-bold fs-5 text-primary">
                  ₹{total}
                </span>
              </div>

              <button onClick={() => navigate("/checkout")} className="btn btn-dark w-100 py-2 fw-bold">
                PROCEED TO CHECKOUT
              </button>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart
