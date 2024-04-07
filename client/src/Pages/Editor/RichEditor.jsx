import React, { useRef, useState, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const RichEditor = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || 'Start typing...'
    }),
    [placeholder]
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