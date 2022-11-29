import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class Editor extends Component {
    render() {
        return (
            <div className="Editor">
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                    } }
                />
            </div>
        );
    }
}

export default Editor;