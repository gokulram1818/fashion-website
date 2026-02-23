import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Product.css"

export const Product = () => {
  const { productId } = useParams()

  const [product, setProduct] = useState({})
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      alert("Please login first")
      return;
    }

    if (!selectedSize) {
      alert("Please select a size")
      return;
    }

    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product._id,
        size: selectedSize,
      }),
    });

    const data = await res.json();


    if (data.success) {
      alert("Added to cart ")
    } else {
      alert(data.message || "Failed to add to cart")
    }

  } catch (error) {
    console.error("Add to Cart Error:", error)
    alert("Something went wrong")
  }
};

  useEffect(() => {
    fetch(`http://localhost:5000/api/product/single/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data.product))
  }, [productId])

  return (
    <div className="container product-page">
      <div className="row">
        <div className="col-md-1 col-12 order-md-1 order-2 thumb-col">
          {product.image?.map((img, i) => (
            <img key={i}  src={img} className={`thumb ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)} />
          ))}
        </div>

        <div className="col-md-5 col-12 order-md-2 order-1">
          <div className="main-box">
            <img src={product.image?.[activeImg]} className="main-img" />
          </div>
        </div>


        <div className="col-md-6 col-12 order-md-3 order-3 details">
          <h2>{product.name}</h2>
          <h3 className="price my-3">₹{product.price}</h3>
          <p className=" mt-2 lh-lg">{product.description}</p>

          <h5 className="mt-4">Select Size</h5>

          <div className="size-box">
            {product.sizes?.map((s, i) => (
              <button
                key={i}
                className={`size-btn ${selectedSize === s ? "active" : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <button className="add-cart-btn mt-3" onClick={handleAddToCart} >
            ADD TO CART
          </button>
          <hr />
          <p className=" lh-lg">100% Original product. <br />

Cash on delivery is available on this product. <br />

Easy return and exchange policy within 7 days.</p>

        </div>

      </div>
    </div>
  )
}

export default Product
