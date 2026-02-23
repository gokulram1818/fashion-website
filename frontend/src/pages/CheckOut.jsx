import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:5000/api/cart/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (data.success) {
        setCartItems(data.items)
      }

      setLoading(false);
    } catch (error) {
      console.error("Cart Fetch Error:", error)
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCart()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const shipping = 100;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first")
        return;
      }

      if (cartItems.length === 0) {
        alert("Your cart is empty")
        return
      }

      const res = await fetch(
        "http://localhost:5000/api/orders/place-cod",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json()

      if (data.success) {
        alert("Order Placed Successfully ")
        navigate("/orders")
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error("Order Error:", error)
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading Checkout...</h2>;

  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4">Checkout </h2>

      <div className="row">
        <div className="col-lg-7">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Delivery Address</h4>

            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zip Code"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5 mt-4 mt-lg-0">
          <div className="card p-4 shadow-sm border-primary sticky-top">
            <h4 className="mb-3">Order Summary</h4>

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center mb-3"
              >
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  width="60"
                  className="me-3 rounded"
                />

                <div className="flex-grow-1">
                  <p className="mb-0 fw-bold">
                    {item.product.name}
                  </p>
                  <small>
                    Size: {item.size} | Qty: {item.quantity}
                  </small>
                </div>

                <span className="fw-bold">
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            ))}

            <hr />

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
              <span className="fw-bold fs-5 text-success">
                ₹{total}
              </span>
            </div>

            <button
              className="btn btn-dark w-100 py-2 fw-bold"
              onClick={handlePlaceOrder}
            >
              PLACE ORDER (COD)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
