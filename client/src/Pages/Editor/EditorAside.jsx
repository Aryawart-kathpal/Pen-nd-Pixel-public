import React from "react";
import Toggle from "../../Components/Toggle";
import { useTheme } from "../../Context/ThemeProvider";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineExport } from "react-icons/ai";
import { AiOutlineCopy } from "react-icons/ai";


const EditorAside = () => {
	const { isDarkMode, toggleTheme } = useTheme();
	return (
		<div className="w-[300px] min-h-screen max-h-screen max-lg:absolute top-0 left-0 flex flex-col border border-black py-2 px-3">
			<div className="w-full h-12 border-b border-black flex">
				{/* User photo button to access the profile */}
				<img
					src="https://via.placeholder.com/50"
					alt="User"
					className="w-10 h-10 rounded-full"
				/>
				{/* Background toggle button */}
				<Toggle onToggle={toggleTheme} tailwind="text-sm" />
			</div>
			{/* Button for 1. Create Note 2. Share (open modal) 3. Dashboard 4. Start Collaboration 5. Export 6. Copy HTML */}
			<div>
				<div>
					<span className="w-full h-12 border-b border-black">Dashboard</span>
				</div>
				<div className="flex items-center">
          <MdOutlineCreateNewFolder className="w-6 h-6" />
					<span className="w-full h-12 border-b border-black">Create Note</span>
				</div>
				<div className="flex items-center">
          <AiOutlineShareAlt className="w-6 h-6" />
					<span className="w-full h-12 border-b border-black">Share</span>
				</div>
				<div className="flex items-center">
          <AiOutlineTeam className="w-6 h-6" />
					<span className="w-full h-12 border-b border-black">
						Start Collaboration
					</span>
				</div>
				<div className="flex items-center">
          <AiOutlineExport className="w-6 h-6" />
					<span className="w-full h-12 border-b border-black">Export</span>
				</div>
				<div className="flex items-center">
          <AiOutlineCopy className="w-6 h-6" />
					<span className="w-full h-12 border-b border-black">Copy HTML</span>
				</div>
			</div>
		</div>
	);
};

export default EditorAside;
