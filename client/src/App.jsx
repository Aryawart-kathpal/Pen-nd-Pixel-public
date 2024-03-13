import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Browser from './Pages/Browser/Browser'
import HomePage from './Pages/Home/HomePage'
import ViewBlog from './Pages/ViewBrowse/ViewBlog'
import NotFound from './Pages/NotFound'
import UserDashboard from './Pages/User/UserDashboard'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/blog' element={<ViewBlog />}></Route>
      <Route path='/browse' element={<Browser />}></Route>
      <Route path='/user' element={<UserDashboard />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
    </>
  )
}

export default App
