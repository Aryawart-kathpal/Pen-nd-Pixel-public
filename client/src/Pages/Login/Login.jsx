import React, { useState } from "react";
import { InputText, Button } from "../../Components/FormInput";
import { useToast } from "@chakra-ui/react";
import validateEmail from "../../Helpers/emailValidator";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Helpers/axiosInstance";

const Login = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});
	async function handleForgotPassword(){
		try {
			if(login.email === ""){
				toast({
					title: "Please enter your email",
					status: "error",
					duration: 2000,
					isClosable: true,
				})
				return;
			};
			const res = axiosInstance.post("/auth/forgot-password", {email: login.email});
			toast.promise(res, {
				success: { 
					title: "Password reset link sent", 
					description: "Check your email",
					duration: 1000,
					isClosable: true,
				},
				error: { 
					title: "Failed to send email",
					status: "error",
					duration: 2000,
					isClosable: true,
				},
				loading: { title: "Sending email...", description: "Please wait" },
			});
		} catch (error) {
			console.log(error);
		}
	}
	async function handleLogin() {
		if (!login.email || !login.password) {
			toast({
				title: "Please fill all fields",
				status: "error",
				duration: 2000,
				isClosable: true,
			});
			return;
		}
		if (!validateEmail(login.email)) {
			toast({
				title: "Invalid email",
				status: "error",
				duration: 2000,
				isClosable: true,
			});
			return;
		}
		try {
			// console.log(login);
			const res = axiosInstance.post("/auth/login", login);
			toast.promise(res, {
				success: { 
					title: "Login Successful", 
					description: "Welcome back",
					duration: 1000,
					isClosable: true,
				},
				error: { 
					title: "Login Failed",
					status: "error",
					duration: 2000,
					isClosable: true, 
				},
				loading: { title: "Authenticating...", description: "Please wait" },
			});
            const response = await res;
            console.log('Response:', response)
            // localStorage.setItem("token", response.user.tokenUser);
			localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("isLoggedIn", true);
			navigate("/user");
		} catch (error) {
			console.log(error);
			toast({
				title: error.response.data.msg,
				status: "error",
				duration: 2000,
				isClosable: true,
			});
		}
	}
	const LoginSchema = [
		{
			type: "email",
			name: "loginEmail",
			placeholder: "Email (example@test.com)",
			value: login.email,
			handleOnChange: (e) => {
				setLogin({ ...login, email: e.target.value });
			},
		},
		{
			type: "password",
			name: "loginPassword",
			placeholder: "Password",
			value: login.password,
			handleOnChange: (e) => {
				setLogin({ ...login, password: e.target.value });
			},
		},
	];

	return (
		<div className="form-container" id="login">
			<div className="form">
				<h2>Login</h2>
				<h5>Glad you're back</h5>
				<div className="form1">
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
					<Button name={"Login"} handleOnSubmit={handleLogin} />
					{/* create forget password link */}
					<p className="text-blue-500 cursor-pointer">
						<span onClick={handleForgotPassword}>Forgot Password?</span>
					</p>
					
				</div>
			</div>
			<p>
				Don't have an account?.
				<span
					onClick={() => {
						document
							.getElementById("signup")
							?.scrollIntoView({ behavior: "smooth" });
					}}
				>
					SignUp
				</span>
			</p>
		</div>
	);
};

export default Login;
