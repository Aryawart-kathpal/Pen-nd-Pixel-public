// import React from 'react'
import './Login.css'
import Login from './Login'
import Signup from './Signup'
import {useNavigate} from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { useEffect } from 'react';


export default function LoginLayout(){
    const navigate = useNavigate();
	// Get value of isLoggedIn from localStorage and if true then redirect to dashboard
	useEffect(() => {
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		if(isLoggedIn == 'true'){
			navigate('/user');
		}
	}, [])

    return (
			<div className="container relative">
				<IoIosArrowBack
					className="text-3xl absolute top-10 left-10 max-sm:hidden cursor-pointer"
					onClick={() => navigate(-1)}
				/>
				<div className="page customZoomIn">
					<div className="toggle">
						<Login />
						<Signup />
					</div>
				</div>
			</div>
		);
}