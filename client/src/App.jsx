import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Browser from './Pages/Browser/Browser'
import HomePage from './Home/HomePage'
import ViewBlog from './Pages/ViewBrowse/ViewBlog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/blog' element={<ViewBlog />}></Route>
      <Route path='/browse' element={<Browser />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
    </>
  )
}

export default App
