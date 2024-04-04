import React, { useState } from "react";
import { InputText, Button } from "../../Components/FormInput";
import { useToast } from "@chakra-ui/react";
import validateEmail from "../../Helpers/emailValidator";
import validatePassword from "../../Helpers/passwordValidator";
import axiosInstance from "../../Helpers/axiosInstance";

const Signup = () => {
	const toast = useToast();
	const [Signup, setSignup] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	async function handleSignup() {
		if (
			!Signup.name ||
			!Signup.confirmPassword ||
			!Signup.email ||
			!Signup.password
		) {
			toast({
				title: "Sign Up Failed",
				description: `Fill All Details`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} else if (!validateEmail(Signup.email)) {
			toast({
				title: "Sign Up Failed",
				description: `Invalid Email ${Signup.email}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} else if (!validatePassword(Signup.password)) {
			toast({
				title: "Sign Up Failed",
				description: `Password must contain atleast one capital letter, one digit, one special character`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} else if (Signup.password != Signup.confirmPassword) {
			toast({
				title: "Sign Up Failed",
				description: `Password not matched!!`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}

		try {
			const res = axiosInstance.post("/auth/register", Signup);
			toast.promise(res, {
				loading: {
					title: "Loading",
					description: "Signing Up",
					status: "info",
				},
				success: {
					title: `Kindly Verify Your Email : ${Signup.email}`,
					status: "success",
				},
				error: {
					title: "Sign Up Failed",
					description: "Something went wrong",
					status: "error",
				},
			});
			const response = await res;
			console.log(response);
			setSignup({
				name: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
		} catch (err) {
			console.log(err);
		}
	}
	const SignupSchema = [
		{
			type: "text",
			name: "name",
			placeholder: "Name (eg. John Doe)",
			value: Signup.name,
			handleOnChange: (e) => {
				setSignup({ ...Signup, name: e.target.value });
			},
		},

		{
			type: "email",
			name: "SignupEmail",
			placeholder: "Email (example@test.com)",
			value: Signup.email,
			handleOnChange: (e) => {
				setSignup({ ...Signup, email: e.target.value });
			},
		},
		{
			type: "password",
			name: "SignupPassword",
			placeholder: "Password",
			value: Signup.password,
			handleOnChange: (e) => {
				setSignup({ ...Signup, password: e.target.value });
			},
		},
		{
			type: "password",
			name: "ConfirmPassword",
			placeholder: "Confirm Password",
			value: Signup.confirmPassword,
			handleOnChange: (e) => {
				setSignup({ ...Signup, confirmPassword: e.target.value });
			},
		},
	];

	return (
		<div className="form-container" id="signup">
			<div className="form">
				<h2>Signup</h2>
				<h5>Just some details to get you in .!</h5>
				<div className="form1">
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

					<Button name={"Signup"} handleOnSubmit={handleSignup} />
				</div>
			</div>
			<p>
				Already have an account?.
				<span
					onClick={() => {
						document
							.getElementById("login")
							?.scrollIntoView({ behavior: "smooth" });
					}}
				>
					Login
				</span>
			</p>
		</div>
	);
};

export default Signup;
