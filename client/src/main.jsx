import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('Pen-And-Pixel')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    
)
