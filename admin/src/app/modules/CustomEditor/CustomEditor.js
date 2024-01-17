import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
//import renderHTML from 'react-render-html';
//import parser, { attributesToProps } from "html-react-parser";
// NOTE: Use the editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
//import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';

// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
// import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';

const editorConfiguration = {
    plugins: [
        Essentials,
        Bold,
        Italic,
        Paragraph,
        SourceEditing,
        Heading,
        Link,
        List,
        BlockQuote,
        Table,
        TableToolbar,
        GeneralHtmlSupport
    ],
    //, CloudServices, EasyImage, Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload
    //toolbar: ["sourceEditing", "heading", "bold", "italic"]
    toolbar: {
        items: [
            'sourceEditing',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'blockQuote',
            'insertTable',
            'undo',
            'redo'
        ]
    },
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ]
    }

    // 'uploadImage',
};

const CustomEditor = (props) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data={props.data}
            className={props.className}
            onChange={props.onChange}
        />
    );
}
export default CustomEditor;
