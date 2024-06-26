import React from "react";
import { FaPenNib } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Toggle from "../Components/Toggle";
import { useTheme } from "../Context/ThemeProvider";

const Nav = () => {
	const { isDarkMode, toggleTheme } = useTheme();
	//   Extraxt the value of isLogged from the localStorage
	const isLogged = localStorage.getItem("isLoggedIn");
	return (
		<header className="px-4 lg:px-6 h-[10svh] flex items-center bg-black text-white w-full">
			<Link className="flex items-center justify-center" to="/">
				<FaPenNib className="h-6 w-6" />
				<span className="sr-only">Pen and Pixel</span>
			</Link>
			<nav className="ml-auto flex gap-4 sm:gap-6 items-center">
				<Link
					to="/browse"
					className="text-sm font-medium hover:underline underline-offset-4"
				>
					Browse
				</Link>
				<Link
					to="/about"
					className="text-sm font-medium hover:underline underline-offset-4"
				>
					About
				</Link>
				<Link
					to="/contact"
					className="text-sm font-medium hover:underline underline-offset-4"
				>
					Contact
				</Link>
				{isLogged === "true" ? (
					<Link
						to="/user"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Profile
					</Link>
				) : (
					<Link
						to="/login"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Login
					</Link>
				)}
				<Toggle onToggle={toggleTheme} />
			</nav>
		</header>
	);
};

export default Nav;
