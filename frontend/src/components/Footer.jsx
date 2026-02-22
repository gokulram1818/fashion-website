import React from 'react'
import './Footer.css'
import logo2 from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer-section bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row g-5">

          <div className="col-lg-4 col-md-6 text-center text-md-start">
            <img src={logo2} className="footer-logo mb-3" alt="Trends Logo" />
            <p className="text-secondary small pe-lg-5">
              Welcome to our store, your go-to destination for trendy and affordable fashion. 
              Elevating your style with pieces that speak for themselves.
            </p>
          </div>

          <div className="col-lg-4 col-md-6 text-center">
            <h6 className="text-uppercase fw-bold mb-4 ls-wide">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link className="footer-link" to="/">Home</Link></li>
              <li><Link className="footer-link" to="/collection">Collection</Link></li>
              <li><Link className="footer-link" to="/about">About</Link></li>
              <li><Link className="footer-link" to="/contact">Contact</Link></li>
              <li><Link className="footer-link admin-tag" to="/login">Admin Portal</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 text-center text-md-start">
            <h6 className="text-uppercase fw-bold mb-4 ls-wide">Get in Touch</h6>
            <div className="contact-details small text-secondary">
              <p className="mb-2"><span className="text-white me-2">📞</span> +91 8668017837</p>
              <p className="mb-4"><span className="text-white me-2">✉️</span> admin@trends.com</p>
            </div>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
               <div className="social-circle">f</div>
               <div className="social-circle">t</div>
               <div className="social-circle">i</div>
            </div>
          </div>

        </div>

        <div className="border-top border-secondary mt-5 pt-4">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="small text-secondary mb-0">© 2026 <span className="text-white fw-medium">Trends</span>. All Rights Reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
               <span className="small text-secondary mx-2">Privacy Policy</span>
               <span className="small text-secondary mx-2">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer