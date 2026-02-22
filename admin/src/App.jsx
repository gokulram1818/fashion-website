import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import List from './pages/List'
import Orders from './pages/Orders'

const App = () => {
  return (
    <div>
      
      <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/add' element={<><Navbar/><Home/></>} />
      <Route path='/list' element={<><Navbar/><List/></>} />
      <Route path='/orders' element={<><Navbar/><Orders/></>} />
      </Routes>
    </div>
  )
}

export default App