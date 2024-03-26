// import React from 'react'
import './Login.css'
import Login from './Login'
import Signup from './Signup'


export default function LoginLayout(){
    return (
        <div className="container">
            <div className="page customZoomIn bg-black">
                <div className="toggle">
                    <Login />
                    <Signup />
                </div>
            </div>
        </div>
    )
}