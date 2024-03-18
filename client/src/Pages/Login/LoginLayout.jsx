// import React from 'react'
import './Login.css'
import Login from './Login'
import SignUp from './SignUp'


export default function LoginLayout(){
    return (
        <div className="container">
            <img src="" alt="" />
            <div className="page">
                <div className="toggle">
                    <Login />
                    <SignUp />
                </div>
            </div>
        </div>
    )
}