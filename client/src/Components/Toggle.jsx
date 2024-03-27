import React, { useEffect, useState } from "react";

const Toggle = ({ onToggle }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const handleToggle = () => {
		setIsDarkMode(!isDarkMode);
		onToggle(!isDarkMode);
	};

	// useEffect(() => {
	// 	const penNpixel = document.getElementById("Pen-And-Pixel");
	// 	if (isDarkMode) {
	// 		penNpixel.classList.add("dark");
	// 	} else {
	// 		penNpixel.classList.remove("dark");
	// 	}
	// }, [isDarkMode]);

	return (
		<div className="flex items-center">
			<span className="mr-2">{isDarkMode ? 'Light' : 'Dark'}</span>
			<label htmlFor="toggle" className="flex items-center cursor-pointer">
				<div className="relative">
					<input
						type="checkbox"
						id="toggle"
						className="sr-only"
						checked={isDarkMode}
						onChange={handleToggle}
					/>
					<div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
					<div
						className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition transform ${
							isDarkMode ? "translate-x-full" : ""
						}`}
					></div>
				</div>
			</label>
		</div>
	);
};

export default Toggle;
