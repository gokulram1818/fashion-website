import React, { useEffect, useState } from 'react'
import './List.css'

const List = () => {
  const [collection, setCollection] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/product/list")
      .then(res => res.json())
      .then(data => {
        setCollection(data.products || [])
      })
      .catch(err => console.log(err))
  }, [])
  const handleRemove = async (productId) => {

  try {
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5000/api/product/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Product Removed Successfully ")

      setCollection((prev) => prev.filter((item) => item._id !== productId))
    } else {
      alert(data.message)
    }
  } catch (error) {
    console.log("Remove Error:", error)
    alert("Failed to remove product")
  }
};

  return (
<div className="container mt-5 px-4">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h3 className="fw-bold mb-0">All Products</h3>
    <span className="badge bg-secondary">{collection.length} Items</span>
  </div>

  <div className="table-responsive shadow-sm rounded border">
    <table className="table table-hover align-middle mb-0">
      <thead className="table-light">
        <tr className="text-muted text-uppercase small fw-bold">
          <th className="ps-4" style={{ width: '100px' }}>Image</th>
          <th>Product Name</th>
          <th>Category</th>
          <th className="text-center">Price</th>
          <th className="text-end pe-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {collection.map((p) => (
          <tr key={p._id} className="list-row">
            <td className="ps-4">
              <img
                src={p.image?.[0]}
                alt={p.name}
                className="list-img shadow-sm"
              />
            </td>
            <td>
              <div className="fw-bold text-dark">{p.name}</div>
              <small className="text-muted d-md-none fw-light">{p.category}</small>
            </td>
            <td>
              <span className="badge rounded-pill bg-light text-dark border px-3">
                {p.category}
              </span>
            </td>
            <td className="text-center fw-bold text-dark">
              ₹{p.price}
            </td>
            <td className="text-end pe-4">
              <button
                className="btn btn-outline-danger btn-sm rounded-circle shadow-sm"
                onClick={() => handleRemove(p._id)}
                title="Remove Product"
                style={{ width: '32px', height: '32px', padding: '0' }}
              >
                <i className="bi bi-trash">×</i> 
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>  )
}

export default List