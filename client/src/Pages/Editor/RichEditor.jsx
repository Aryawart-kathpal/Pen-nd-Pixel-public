import React from "react";
import {
                EditorBubble,
                EditorBubbleItem,
                EditorCommand,
                EditorCommandItem,
                EditorContent,
                EditorRoot,
        } from "novel";
    
const RichEditor = () => (
        <EditorRoot>
            <EditorContent>
                <EditorCommand>
                    <EditorCommandItem onCommand={function ({ editor, range }) {
                        throw new Error("Function not implemented.");
                    }} />
                    <EditorCommandItem onCommand={function ({ editor, range }) {
                        throw new Error("Function not implemented.");
                    }} />
                    <EditorCommandItem onCommand={function ({ editor, range }) {
                        throw new Error("Function not implemented.");
                    }} />
                </EditorCommand>
                <EditorBubble>
                    <EditorBubbleItem children={undefined} />
                    <EditorBubbleItem children={undefined} />
                    <EditorBubbleItem children={undefined} />
                </EditorBubble>
            </EditorContent>
        </EditorRoot>
    );
export default RichEditor;
  