import React, { useState } from 'react';
import { InputText, Button } from '../../Components/FormInput';
import { useToast } from '@chakra-ui/react'
import validateEmail from '../../Helpers/emailValidator';
import validatePassword from '../../Helpers/passwordValidator';


const Signup = () => {
    const toast = useToast();
    const [Signup, setSignup] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword:""
    });
    function handleSignup(){
        if(!Signup.fullname || !Signup.confirmPassword || !Signup.email || !Signup.password){
            toast({
                title: 'Sign Up Failed',
                description: `Fill All Details`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        else if(!validateEmail(Signup.email)){
            toast({
                title: 'Sign Up Failed',
                description: `Invalid Email ${Signup.email}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        else if(!validatePassword(Signup.password)){
            toast({
                title: 'Sign Up Failed',
                description: `Password must contain atleast one capital letter, one digit, one special character`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        else if(Signup.password != Signup.confirmPassword){
            toast({
                title: 'Sign Up Failed',
                description: `Password not matched!!`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }

        // Backend calls
        // if()
        toast({
            title: 'Successfully Signed Up',
            description: `Signed up as ${Signup.fullname}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        setSignup({
            fullname: "",
            email: "",
            password: "",
            confirmPassword:""
        })
    }
    const SignupSchema = [
        {
            type: "text",
            name: "fullname",
            placeholder: "FullName (eg. John Doe)",
            value: Signup.fullname,
            handleOnChange: (e) => {
                setSignup({...Signup, fullname: e.target.value});
            }
        },

        {
            type: "email",
            name: "SignupEmail",
            placeholder: "Email (example@test.com)",
            value: Signup.email,
            handleOnChange: (e) => {
                setSignup({...Signup, email: e.target.value});
            }
        },
        {
            type: "password",
            name: "SignupPassword",
            placeholder: "Password",
            value: Signup.password,
            handleOnChange: (e) => {
                setSignup({...Signup, password: e.target.value});
            }
        },
        {
            type: "password",
            name: "ConfirmPassword",
            placeholder: "Confirm Password",
            value: Signup.confirmPassword,
            handleOnChange: (e) => {
                setSignup({...Signup, confirmPassword: e.target.value});
            }
        }
    ];

  return (
    <div className="form-container" id="signup">
        <div className="form">
            <h2>Signup</h2>
            <h5>Just some details to get you in .!</h5>
            <div className='form1'>

            {SignupSchema.map((input, index) => (
                        <InputText 
                            key={index} 
                            type={input.type} 
                            name={input.name} 
                            placeholder={input.placeholder} 
                            value={input.value} 
                            handleOnChange={input.handleOnChange} 
                        />
                    ))}

                    <Button
                        name={"Signup"}
                        handleOnSubmit={handleSignup}
                    />
            </div>
        </div>
        <p>
            Already have an account?. 
                <span 
                    
                    onClick={
                        ()=>{
                            document.getElementById('login')?.scrollIntoView({ behavior: 'smooth' })
                        }
                    }>
                    Login
                </span>
        </p>
    </div>
  )
}

export default Signup
