import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import heroModel from '../assets/hero-model.png'
import Card from "../components/Card"


const Home = () => {
  return (
    <div style={{marginTop:"55px"}} className=''>
      <div className="hero container-fluid row g-0">
  

  <div className="col-lg-6 col-12 order-lg-1 d-flex justify-content-center align-items-center">
    <img className="img-fluid" src={heroModel} alt="model" />
  </div>
  <div className="d-flex order-lg-0  flex-column col-lg-6 col-12 text-white align-items-center justify-content-center word">
    <div >
      <h1 className="words">TIMELESS.</h1>
      <h1 className="words">NEW STYLE.</h1>
      <h1 className="words">COLLECTION</h1>
      <h2 className="sub-word my-4">LUXURY FASHION HOUSE</h2>

      <Link to="/Collection"
        className="discover-btn btn text-white d-flex justify-content-center mt-3 w-50">
        DISCOVER MORE
      </Link>
    </div>
  </div>
</div>
<div className=' container'>
  <h1 className=' text-center'>LATEST COLLECTION</h1>
</div>
<div className=' container'>
  <div className='row'>
  <Card limit={8} type="all"/>
  </div>
</div>
<div className=' container'>
  <h1 className=' text-center'>BEST SELLERS</h1>
</div>
<div className='container'>
  <div className='row'>
    <Card limit={10} type="best"/>
  </div>
</div>

    </div>
  )
}

export default Home 