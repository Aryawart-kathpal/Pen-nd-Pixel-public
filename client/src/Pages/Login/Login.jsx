import React, { useState } from 'react';
import { InputText , Button } from '../../Components/FormInput';
import { useToast } from '@chakra-ui/react'
import validateEmail from '../../Helpers/emailValidator';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    function handleLogin(){
        console.log("Hello");
        if(login.email && login.password){
            if(validateEmail(login.email)){
                toast({
                    title: 'Logged In',
                    description: `Logged in as ${login.email}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                navigate('/user')
            }
            else{
                toast({
                    title: 'Logged Failed',
                    description: `Invalid Email : ${login.email}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }
        else{
            toast({
                title: 'Logged Failed',
                description: `Enter all Details`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        
    }
    const LoginSchema = [
        {
            type: "email",
            name: "loginEmail",
            placeholder: "Email (example@test.com)",
            value: login.email,
            handleOnChange: (e) => {
                setLogin({...login, email: e.target.value});
            }
        },
        {
            type: "password",
            name: "loginPassword",
            placeholder: "Password",
            value: login.password,
            handleOnChange: (e) => {
                setLogin({...login, password: e.target.value});
            }
        }
    ];

    return (
        <div className="form-container" id="login">
            <div className="form">
                <h2>Login</h2>
                <h5>Glad you're back</h5>
                <div className='form1'>
                    {LoginSchema.map((input, index) => (
                        <InputText 
                            key={index} 
                            type={input.type} 
                            name={input.name} 
                            placeholder={input.placeholder} 
                            value={input.value} 
                            handleOnChange={input.handleOnChange} 
                        />
                    ))}
                    <label htmlFor="remember">
                        <input type="checkbox" name="remember" id="remember" /> remember me
                    </label>
                    <Button 
                        name={"Login"}
                        handleOnSubmit={handleLogin}
                    />
                </div>
            </div>
            <p>
                Don't have an account?. 
                <span 
                    onClick={
                        () => {
                            document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }>
                    SignUp
                </span>
            </p>
        </div>
    );
};

export default Login;