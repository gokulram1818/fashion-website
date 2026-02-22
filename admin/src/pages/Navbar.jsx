import React from 'react'
import logo2 from '../assets/logo2.png'
import {Link, useNavigate} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () =>{
      localStorage.removeItem("token")
      localStorage.removeItem("admin")
      localStorage.removeItem("role")
      navigate("/login")
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center" to="/add">
          <img src={logo2} alt="logo" className='admin-logo' />
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/add">Add</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/list">List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/orders">Orders</Link>
            </li>
          </ul>

          <div className="d-flex justify-content-center">
            <button 
              className="btn btn-light rounded-pill px-4 fw-bold shadow-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar