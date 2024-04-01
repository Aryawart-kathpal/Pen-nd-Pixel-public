import RichEditor from "./RichEditor"
import EditorAside from "./EditorAside"

export default function CreateNote(){
    return (
        <div className="flex relative">
            <EditorAside />
            <RichEditor />
        </div>
    )
}