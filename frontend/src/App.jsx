import React from 'react'
import {Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Login from './pages/Login'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import MyOrder from './pages/Order'
import Contact from './pages/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<CheckOut/>}/>
        <Route path='/orders' element={<MyOrder/>} />
        <Route path='/product/single/:productId' element={<Product/>}/>
      </Routes>
      <Footer />
    </div>
  ) 
}

export default App
