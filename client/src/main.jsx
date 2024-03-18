import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeProvider";
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById("Pen-And-Pixel")).render(
	<ChakraProvider>
	<BrowserRouter>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</BrowserRouter>
	</ChakraProvider>
);
