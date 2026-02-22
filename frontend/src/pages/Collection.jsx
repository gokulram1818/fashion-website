import { useEffect, useState } from 'react'
import './Collection.css'
import { Link } from 'react-router-dom'
const Collection = () => {
  const [category, setCategory] = useState([])
  const [type, setType] = useState([])
  const [sort, setSort] = useState("none")
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([]);
const [filtered, setFiltered] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/product/list")
    .then(res => res.json())
    .then(data => {
      setProducts(data.products)
      setFiltered(data.products)
    })
}, [])

  const handleCategory = (e) =>{
    const value = e.target.value
    if(e.target.checked){
      setCategory([...category, value])
    }else{
      setCategory(category.filter(c => c!== value))
    }
  }

  const handleType = (e) =>{
    const value = e.target.value
    if(e.target.checked){
      setType([...type, value])
    }else{
      setType(type.filter(c => c!== value))
    }
  }
  
useEffect(() => {
  let temp = [...products];
  if (category.length > 0) {
    temp = temp.filter(p =>
      category.includes(p.category)
    )
  }
  if (type.length > 0) {
    temp = temp.filter(p =>
      type.includes(p.subCategory)
    )
  }
  if(search){
    temp=temp.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  }
  if (sort === "low-high") {
    temp.sort((a, b) => a.price - b.price);
  }if (sort === 'high-low') {
    temp.sort((a, b) => b.price - a.price);
  }
  setFiltered(temp);
},[category,type,sort,search,products])

  return (
    <div className='coll container'>
      
      <div className=' container '>
        <div className=' d-flex justify-content-center'>
        <input type="text" className=' my-4 rounded-2 border-1 col-12 col-md-6 ps-2 fs-4' onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
        </div>
<div className="row g-3">

  <div className="col-6 col-md-4">
    <h2 className="filterings">Category</h2>

    <label className="d-block mb-2">
      <input type="checkbox" value="Men" onChange={handleCategory} className="me-2"/>
      Men
    </label>

    <label className="d-block mb-2">
      <input type="checkbox" value="Women" onChange={handleCategory} className="me-2"/>
      Women
    </label>

    <label className="d-block mb-2">
      <input type="checkbox" value="Kids" onChange={handleCategory} className="me-2"/>
      Kids
    </label>
  </div>

  <div className="col-6 col-md-4">
    <h2 className="filterings">Type</h2>

    <label className="d-block mb-2">
      <input type="checkbox" value="Topwear" onChange={handleType} className="me-2"/>
      Topwear
    </label>

    <label className="d-block mb-2">
      <input type="checkbox" value="Bottomwear" onChange={handleType} className="me-2"/>
      Bottomwear
    </label>
  </div>

  <div className="col-12 col-md-4">
    <select
      className="form-select me-sm-3" onChange={(e) => setSort(e.target.value)}>
      <option value="none">Sort by: Relevant</option>
      <option value="low-high">Price: Low → High</option>
      <option value="high-low">Price: High → Low</option>
    </select>
  </div>

</div>
      
      </div>
      <div className=' container'>
        <div className='row'>
          {filtered.map((pro)=>(
            <div className="col-6 col-md-4 col-lg-3" key={pro._id}>

      <Link to={`/product/single/${pro._id}`} key={pro._id} className="nav-link">
            <div className="card h-100">
                <img src={pro.image[0]} alt="" className=" card-img-top"/>
            </div>
            <div className=" card-body">
                <h3 className='name'>{pro.name}</h3>
                <h3 className='name'>₹{pro.price}</h3>
            </div>
        </Link>

    </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection