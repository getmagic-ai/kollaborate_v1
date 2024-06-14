import { useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const RichTextEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
    const onEditorStateChange = (newEditorState) => {
      setEditorState(newEditorState);
    };
  
    const getRichText = () => {
      const contentState = editorState.getCurrentContent();
      return JSON.stringify(convertToRaw(contentState));
    };
  
    return (
      <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="your-custom-wrapper-class"
          editorClassName="your-custom-editor-class"
        />
        <button onClick={getRichText}>Get Rich Text</button>
      </div>
    );
  };