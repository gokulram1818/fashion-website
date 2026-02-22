import React from 'react'
import './About.css'
import { Link } from 'react-router-dom'
import hero_img_abt from  '../assets/hero-img-about.png'
import model_abt from '../assets/model-abt.png'
import diamond from '../assets/diamond.png'
import hanger from '../assets/hanger.png'
import tick from '../assets/tick.png'

const About = () => {
  return (
    <div>
      <div className='hero-back container-fluid'>
        <div className=' row row-abt g-0'>
        <div className='col-12 col-md-6 p-5  justify-content-md-center d-flex align-items-center '>
          <div className=' d-flex flex-column'>
            <h1 className='abt fw-light'>About Us</h1>
            <p className='para fs-5'>Style . Comfort . Confidence</p>
            <p className='para'>
              Welcome to our store, your go-to destination for trendy <br />and affordable fashion.Discover our story <br />and what makes us unique!
            </p>
            <Link to='/collection' className=' btn rounded-pill text-white bttn w-50'>Shop now</Link>

          </div>
        </div>
        <div className=' col-md-6 d-none d-md-flex justify-content-center '>
          <img src={hero_img_abt} alt=""  className=' img-fluid justify-content-end d-flex hero-abt-image-div'/>

        </div>
      </div>
    </div>
<div className="container story-section mt-5">
  <div className="row align-items-center g-4">
    <div className="col-12 col-md-6">
      <img src={model_abt} alt="Our story" className="img-fluid story-img"/>
    </div>
    <div className="col-12 col-md-6">
      <span className="section-tag">OUR JOURNEY</span>
      <h1 className="abt-title">Our Story</h1>
      <p className="story-text">Our journey began with a simple love for fashion and a desire to redefine everyday style. We wanted to create a space where comfort meets elegance and affordability meets quality.</p>
      <p className="story-text">Every piece is thoughtfully handpicked — fabrics that feel good, fits that move with your lifestyle, and styles that transition effortlessly from day to night.</p>
      <p className="story-text">We believe clothing should empower, not restrict. Our mission is to deliver collections that inspire confidence and celebrate individuality.</p>
      <Link to='/collection' className="btn story-btn mt-3">Explore Collection</Link>
    </div>

  </div>
</div>
<div className=' container why-us mt-5'>
  <div className="row gap-0">
    <div className=" why-choose-us col-md-3 col-sm-12 d-flex flex-column align-items-center align-items-md-start text-center text-md-start">

      <h1 className=' why-us-head me-2'>Why Choose Us</h1>
      <p className='story-text mt-5'>✓ Premium Quality Fabrics</p>
      <p className='story-text mt-3'>✓ Affordable Prices</p>
      <p className='story-text mt-3'>✓ On-trend Collections</p>
      <p className='story-text mt-3'>✓ Customer-first Approach</p>
    </div>
    
    <div className='col-md-9 '>
      <h1 className='our-values d-flex flex-column align-items-center align-items-md-start text-center text-md-start mt-sm-3 mt-md-0'>Our Values</h1>
      <div className="row">
        <div className='col-md-4 text-center'>
          
          <img src={diamond} className='img-fluid three-img1' />
          <h3>Quality</h3>
          <p>We prioritize high quality and <br />attention to detail</p>
        </div>

        <div className='col-md-4 text-center'>
          <img src={hanger} className='img-fluid three-img2' />
          <h3>Style</h3>
          <p>Trendy designs that match <br /> modern lifestyle</p>
        </div>

        <div className='col-md-4 text-center'>
          <img src={tick} className='img-fluid three-img3' />
          <h3>Trust</h3>
          <p>Transparency and <br /> customer satisfaction</p>
        </div>

</div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default About