import React, { useRef, useState, useMemo } from 'react';
import { useTheme } from "../../Context/ThemeProvider";
import JoditEditor from 'jodit-react';

const RichEditor = ({ placeholder }) => {
	const { isDarkMode, toggleTheme } = useTheme();

  const editor = useRef(null);
  const [content, setContent] = useState('<h1>Hello I am a rich text editor!</h1>');

  const config = useMemo(
		() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			// placeholder: placeholder || "Start typing...",
			toolbarAdaptive: false,
			theme: isDarkMode ? "dark" : "",
			height: "90svh",
		}),
		[isDarkMode]
	);

  const handleBlur = (newContent) => {
    setContent(newContent);
    console.log(newContent);
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onBlur={handleBlur}
      tabIndex={1} // tabIndex of textarea
      className='w-full h-screen'
    />
  );
};

export default RichEditor;