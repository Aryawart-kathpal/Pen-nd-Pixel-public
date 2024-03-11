import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Browser from './Browser/Browser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/browser' element={<Browser />}></Route>
    </Routes>
    </>
  )
}

export default App
