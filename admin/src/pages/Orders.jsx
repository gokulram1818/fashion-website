import React, { useEffect, useState } from 'react';
import order_img from '../assets/order.png'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const handleStatusChange = async (orderId, newStatus) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/orders/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderId,
        status: newStatus,
      }),
    })

    const data = await res.json();

    if (data.success) {
      
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Status update failed:", error);
  }
};

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token")
      try {
        const res = await fetch("http://localhost:5000/api/orders/all", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (data.success) setOrders(data.orders)
      } catch (err) {
        console.error("Failed to fetch orders", err)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className="container mt-5 px-lg-4">
      <div className="d-flex align-items-center mb-4">
        <h3 className="fw-bold me-3 mb-0">Order Management</h3>
        <span className="badge bg-dark rounded-pill">{orders.length}</span>
      </div>

      <div className="row g-3">
        {orders.map((o) => (
          <div key={o._id} className="col-12">
            <div className="card border shadow-sm hover-shadow">
              <div className="card-body p-4">
                <div className="row gy-3 align-items-start">
                  
                  <div className="col-auto">
                    <img src={order_img} alt="order" width="45" className="p-1 border rounded bg-light" />
                  </div>

                  <div className="col-md-4">
                    <div className="mb-2">
                      <span className="text-muted small fw-bold text-uppercase ls-1">Customer</span>
                      <p className="mb-0 fw-bold text-dark">{o.first_name} {o.last_name}</p>
                      <p className="small text-muted mb-0">{o.email}</p>
                    </div>
                    <div>
                      <span className="text-muted small fw-bold text-uppercase ls-1">Items</span>
                      <p className="mb-0 small text-primary fw-medium">
                        {o.items.length} items in package
                      </p>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <span className="text-muted small fw-bold text-uppercase ls-1">Ship To</span>
                    <p className="mb-0 small text-dark lh-sm mt-1">
                      {o.street},<br />
                      {o.city}, {o.state} - {o.zipcode}
                    </p>
                  </div>

                  <div className="col-md-2 text-md-center">
                    <span className="text-muted small fw-bold text-uppercase ls-1">Payment</span>
                    <p className="mb-1 fw-bold text-success">₹{o.amount}</p>
                    <span className="badge bg-light text-dark border small fw-normal">
                      {o.paymentMethod || 'COD'}
                    </span>
                  </div>

                  <div className="col-md-2 ms-auto">
                    <span className="text-muted small fw-bold text-uppercase ls-1">Order Status</span>
                    <select 
                      className="form-select form-select-sm mt-1 fw-semibold border-secondary-subtle" 
                      value={o.status}
                      onChange={(e)=>handleStatusChange(o._id, e.target.value)}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders