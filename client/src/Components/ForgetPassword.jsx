import { useState } from "react";
import axiosInstance from "../Helpers/axiosInstance";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import validatePassword from "../Helpers/passwordValidator";

export default function ForgotPassword(){
    // Get Search params
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const toast = useToast()
    const navigate = useNavigate();
    const [password, setPassword] = useState({
        password: "",
        confirmPassword: "",
    });
    const handleonChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    }
    const handleSubmit = async () => {
        if(password.password === "") {
            toast({
                title: "Please fill all fields",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        if(!validatePassword(password.password)){
            toast({
                title: "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        if(password.password !== password.confirmPassword){
            toast({
                title: "Passwords do not match",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        try{
            const res = axiosInstance.post(`/auth/reset-password?token=${token}&email=${email}`, {
                password: password.password,
            });
            toast.promise(res, {
                loading: {title: "Resetting password..."},
                success: {title: "Password reset successfully"},
                error: {title: "An error occurred while resetting password"},
            })
        }
        catch(error){
            console.log(error);
        }
        finally{
            navigate("/");
        }
    }
    // create a field an input field for new Password and a button to submit the new password
    return (
        <div className="h-screen w-full flex flex-col gap-5 items-center justify-center bg-black">
            <input
                type="password"
                placeholder="Enter new password"
                name="password"
                value={password.password}
                onChange={handleonChange}
                required
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Confirm new password"
                required
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handleonChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
} 