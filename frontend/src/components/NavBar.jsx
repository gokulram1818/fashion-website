import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import search from "../assets/search.png"
import cart from "../assets/cart.png"
import account from "../assets/account.png";
import './NavBar.css'

const NavBar = () => {

  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId") 
    setShowDropdown(false)
    navigate("/login")
  };

  const handleAccountClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          <img src={logo} style={{ width: "100px" }} alt="logo" />
        </Link>

        <div className="d-flex align-items-center order-lg-3 position-relative">

          <Link to="/Collection">
            <img src={search} style={{ width: "60px" }} alt="search" />
          </Link>

          <Link to="/cart">
            <img src={cart} style={{ width: "60px" }} alt="cart" />
          </Link>

          <div className="account-wrapper">
            <img
              src={account}
              style={{ width: "60px", cursor: "pointer" }}
              alt="account"
              onClick={handleAccountClick}
            />

            {token && showDropdown && (
              <div className="account-dropdown">
                <Link to="/orders" className="dropdown-item">
                  My Orders
                </Link>

                <button className="dropdown-item" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </div>

        <button
          className="navbar-toggler order-lg-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center order-lg-1"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Collection">Collection</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Contact">Contact</Link>
            </li>
            <li className="nav-item">
                <a
                className="nav-link"
                href="http://localhost:5172/login"
                target="_blank"
                rel="noopener noreferrer"
                >
                Admin
               </a>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default NavBar
