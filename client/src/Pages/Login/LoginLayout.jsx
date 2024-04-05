// import React from 'react'
import './Login.css'
import Login from './Login'
import Signup from './Signup'
import {useNavigate} from 'react-router-dom'
import { VscChevronLeft } from "react-icons/vsc";


export default function LoginLayout(){
    const navigate = useNavigate();
    return (
			<div className="container relative">
                <VscChevronLeft 
                    className='absolute top-10 left-10 text-5xl cursor-pointer hover:scale-110 hover:font-bold transition-all'
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