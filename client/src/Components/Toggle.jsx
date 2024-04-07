import React, { useEffect, useState } from "react";
import { MdBrightnessHigh, MdBrightness2 } from "react-icons/md";

const Toggle = ({ onToggle, tailwind }) => {
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
		<div className={`flex items-center ${tailwind}`}>
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
						className={`absolute top-1 left-1  w-6 h-6 rounded-full transition transform ${
							isDarkMode ? "translate-x-full" : ""
						}`}
					>
						{isDarkMode ? (
							<MdBrightness2 className="w-6 h-6 text-white" />
						) : (
							<MdBrightnessHigh className="w-6 h-6 text-white" />
						)}
					</div>
				</div>
			</label>
		</div>
	);
};

export default Toggle;
