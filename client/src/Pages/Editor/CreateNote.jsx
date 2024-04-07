import RichEditor from "./RichEditor"
import EditorAside from "./EditorAside"
import { useTheme } from "../../Context/ThemeProvider";
// import Toggle from "../../Components/Toggle";
import Nav from "../../Layouts/Nav"
import './editor.css'

export default function CreateNote(){
    const { isDarkMode, toggleTheme } = useTheme();
    return (
			<>
				<Nav />
				<div className="flex relative">
					<EditorAside />
					<RichEditor />
				</div>
			</>
		);
}