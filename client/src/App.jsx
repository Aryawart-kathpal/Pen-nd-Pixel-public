import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Browser from './Pages/Browser/Browser'
import HomePage from './Pages/Home/HomePage'
import ViewBlog from './Pages/ViewBrowse/ViewBlog'
import NotFound from './Pages/NotFound'
import ContactUs from './Pages/Home/ContactUs'
import AboutUs from './Pages/Home/AboutUs'
import LoginLayout from './Pages/Login/LoginLayout'
import UserDashboard from './Pages/User/UserDashboard'
import CreateNote from './Pages/Editor/CreateNote'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/blog/:id' element={<ViewBlog />}></Route>
      <Route path='/blog/new' element={<CreateNote />}></Route>
      <Route path='/browse' element={<Browser />}></Route>

      <Route path='/user' element={<UserDashboard />}></Route>
      {/* Check About page element */}
      <Route path='/about' element={<AboutUs />}></Route>
      {/* Check Contact page element */}
      <Route path='/contact' element={<ContactUs />}></Route>
      <Route path='/login' element={<LoginLayout />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
    </>
  )
}

export default App
