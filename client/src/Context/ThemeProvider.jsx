import React, { useState, createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};
	useEffect(() => {
		const penNpixel = document.getElementById("Pen-And-Pixel");
		if (isDarkMode) {
			penNpixel.classList.add("dark");
		} else {
			penNpixel.classList.remove("dark");
		}
	}, [isDarkMode]);

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
