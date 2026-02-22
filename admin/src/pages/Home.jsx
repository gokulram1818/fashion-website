import React, { useState } from 'react'
import upload_img from '../assets/upload_img.png'
import './Home.css'

const Home = () => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [price, setPrice] = useState("")
  const [bestSeller, setBestSeller] = useState(false)

  const [sizes, setSizes] = useState([])

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  })

  const [files, setFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  })

  const handleImageChange = (e, key) => {
    const file = e.target.files[0]
    if (file) {
      setImages(prev => ({
        ...prev,
        [key]: URL.createObjectURL(file)
      }))

      setFiles(prev => ({
        ...prev,
        [key]: file
      }))
    }
  }

  const handleSizeChange = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size))
    } else {
      setSizes([...sizes, size])
    }
  }

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token")
    e.preventDefault()

    const formData = new FormData()

    formData.append("name", name)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("subCategory", subCategory)
    formData.append("price", price)
    formData.append("bestSeller", bestSeller)

    formData.append("sizes", JSON.stringify(sizes))

    if (files.image1) formData.append("image1", files.image1)
    if (files.image2) formData.append("image2", files.image2)
    if (files.image3) formData.append("image3", files.image3)
    if (files.image4) formData.append("image4", files.image4)

    try {
      const res = await fetch("http://localhost:5000/api/product/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      const data = await res.json()

      if (data.success) {
        alert("Product Added Successfully ")

        setName("")
        setDescription("")
        setPrice("")
        setSizes([])
        setBestSeller(false)
        setImages({
          image1: null,
          image2: null,
          image3: null,
          image4: null
        })
        setFiles({
          image1: null,
          image2: null,
          image3: null,
          image4: null
        })
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
      alert("Upload Failed ")
    }
  }

  return (
    <form onSubmit={handleSubmit} className='container product-form mt-4'>

      <div>
        <p className='mb-2 fw-bold'>Upload Images</p>
        <div className='d-flex flex-wrap gap-3'>
          {["image1", "image2", "image3", "image4"].map((key) => (
            <label key={key} htmlFor={key} className='upload-box'>
              <img
                src={images[key] || upload_img}
                alt="upload"
                className='upload-img'
              />
              <input
                type="file"
                id={key}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, key)}
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className='fw-bold'>Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='form-control w-md-50'
          placeholder='Type here'
        />
      </div>

      <div>
        <p className='fw-bold'>Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          className='form-control w-md-50'
          placeholder='Write the content here'
        />
      </div>

      <div className='row g-3'>
        <div className='col-md-4 col-12'>
          <p className='fw-bold'>Category</p>
          <select
            className='form-select'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='col-md-4 col-12'>
          <p className='fw-bold'>Sub Category</p>
          <select
            className='form-select'
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
          </select>
        </div>

        <div className='col-md-4 col-12'>
          <p className='fw-bold'>Price</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className='form-control'
            placeholder='₹'
          />
        </div>
      </div>

      <div>
        <p className='fw-bold'>Product Sizes</p>
        <div className='d-flex flex-wrap gap-2'>
          {["S", "M", "L", "XL", "XXL"].map(size => (
            <button
              type="button"
              key={size}
              className={`size-btn ${sizes.includes(size) ? "active" : ""}`}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className='form-check mt-3'>
        <input
          type="checkbox"
          className='form-check-input'
          checked={bestSeller}
          onChange={() => setBestSeller(!bestSeller)}
          id="bestseller"
        />
        <label className='form-check-label' htmlFor="bestseller">
          Add to Best Seller
        </label>
      </div>

      <button type="submit" className='btn btn-dark px-4 py-2 mt-3'>
        ADD PRODUCT
      </button>

    </form>
  )
}

export default Home