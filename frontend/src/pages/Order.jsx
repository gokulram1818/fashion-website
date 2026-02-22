import { useEffect, useState } from "react"

const MyOrder = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        "http://localhost:5000/api/orders/user-orders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }

      setLoading(false)
    } catch (error) {
      console.error("Fetch Orders Error:", error)
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders()
  }, []);

  if (loading) {
    return <h2 className="text-center mt-5">Loading Orders...</h2>
  }

  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4">My Orders </h2>

      {orders.length === 0 ? (
        <h4>You have no orders yet.</h4>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="card mb-4 p-3 shadow-sm">
            <div className="d-flex justify-content-between mb-2">
              <h5>Order ID: {order._id}</h5>
              <span className="badge p-2 fw-light bg-success">
                {order.status}
              </span>
            </div>

            {order.items.map((item, i) => (
              <div
                key={i}
                className="d-flex align-items-center border-top pt-3 mt-2"
              >
                <img
                  src={item.image[0]}
                  alt={item.name}
                  width="70"
                  className="rounded me-3"
                />

                <div className="flex-grow-1">
                  <h6 className="mb-1">{item.name}</h6>
                  <small>
                    Size: {item.size} | Qty: {item.quantity}
                  </small>
                </div>

                <div className="fw-bold">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between">
              <span>Total Amount:</span>
              <span className="fw-bold text-primary">
                ₹{order.amount}
              </span>
            </div>

            <small className="text-muted">
              Ordered on: {new Date(order.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrder
