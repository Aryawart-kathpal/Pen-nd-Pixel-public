import React, { useRef, useState, useMemo } from "react";
import { useTheme } from "../../Context/ThemeProvider";
import JoditEditor from "jodit-react";

const RichEditor = ({ content, handleOnBlur }) => {
	const { isDarkMode, toggleTheme } = useTheme();

	const editor = useRef(null);
	

	const config = useMemo(
		() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			// placeholder: placeholder || "Start typing...",
			toolbarAdaptive: false,
			theme: isDarkMode ? "dark" : "",
			height: "80svh",
		}),
		[isDarkMode]
	);


	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			onBlur={handleOnBlur}
			tabIndex={1} // tabIndex of textarea
			className="w-full h-screen"
		/>
	);
};

export default RichEditor;
