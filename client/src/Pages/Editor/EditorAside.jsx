import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineExport } from "react-icons/ai";
import { AiOutlineCopy } from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";

const EditorAside = ({ open, handleOpen, handlePublic, handlePrivate, save }) => {
	const { isDarkMode, toggleTheme } = useTheme();
	const navigate = useNavigate();
	return (
		<div
			className={`customSlideLeft w-[250px] h-[90svh] ${
				open ? "" : "max-lg:hidden"
			} max-lg:absolute z-10 max-lg:backdrop-blur-3xl top-0 left-0 flex flex-col gap-2 max-sm:backdrop-blur-3xl`}
		>
			<RiCloseCircleFill
				className="w-6 h-6 max-lg:absolute lg:hidden z-20 top-4 right-4"
				onClick={handleOpen}
			/>
			<div className="flex flex-col gap-1">
				<div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:shadow-slate-300 px-4 border-slate-500 h-14`}
					onClick={() => navigate("/user")}
				>
					<MdSpaceDashboard className="w-6 h-6" />
					<span className="w-full font-bold">Dashboard</span>
				</div>

				{/* Save Note */}
				<div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}
					onClick={save}
				>
					<MdOutlineCreateNewFolder className="w-6 h-6" />
					<span className="w-full">Save Note</span>
				</div>

				{/* Start Collaboration */}
				<div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}
				>
					<AiOutlineTeam className="w-6 h-6" />
					<span className="w-full">Start Collaboration</span>
				</div>

				{/* Share Button */}
				<div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}
					onClick={handlePublic}
				>
					<AiOutlineShareAlt className="w-6 h-6" />
					<span className="w-full">Share</span>
				</div>

				{/* Export Button */}
				{/* <div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}
				>
					<AiOutlineExport className="w-6 h-6" />
					<span className="w-full">Export</span>
				</div> */}

				{/* Copy HTML */}
				{/* <div
					className={`flex items-center  justify-center gap-6 cursor-pointer ${
						isDarkMode ? `hover:bg-slate-700` : `hover:bg-slate-300`
					} duration-500 hover:text hover:shadow-slate-300 px-4 border-slate-500 h-14`}
				>
					<AiOutlineCopy className="w-6 h-6" />
					<span className="w-full">Copy HTML</span>
				</div> */}
			</div>
		</div>
	);
};

export default EditorAside;
