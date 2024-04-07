import React from "react";
import { useTheme } from "../../Context/ThemeProvider";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineExport } from "react-icons/ai";
import { AiOutlineCopy } from "react-icons/ai";

const EditorAside = () => {
	const { isDarkMode, toggleTheme } = useTheme();
	return (
		<div className="w-[250px] min-h-screen max-h-screen max-lg:absolute top-0 left-0 flex flex-col mr-2 gap-2">
			
			<div className="flex flex-col gap-1">
				<div className={`flex items-center  justify-center gap-6 cursor-pointer ${isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`} duration-500 hover:shadow-slate-300 px-4 border-slate-500 h-14`}>
					<MdSpaceDashboard className="w-6 h-6" />
					<span className="w-full font-bold">
						Dashboard
					</span>
				</div>
				<div className={`flex items-center  justify-center gap-6 cursor-pointer ${isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}>
					<MdOutlineCreateNewFolder className="w-6 h-6" />
					<span className="w-full">Create Note</span>
				</div>
				<div className={`flex items-center  justify-center gap-6 cursor-pointer ${isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}>
					<AiOutlineShareAlt className="w-6 h-6" />
					<span className="w-full">Share</span>
				</div>
				<div className={`flex items-center  justify-center gap-6 cursor-pointer ${isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}>
					<AiOutlineTeam className="w-6 h-6" />
					<span className="w-full">
						Start Collaboration
					</span>
				</div>
				<div className={`flex items-center  justify-center gap-6 cursor-pointer ${isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}>
					<AiOutlineExport className="w-6 h-6" />
					<span className="w-full">Export</span>
				</div>
				<div className={`flex items-center  justify-center gap-6 cursor-pointer ${isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}>
					<AiOutlineCopy className="w-6 h-6" />
					<span className="w-full">Copy HTML</span>
				</div>
			</div>
		</div>
	);
};

export default EditorAside;
