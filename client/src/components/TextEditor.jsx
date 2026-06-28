import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaBold, FaHeading, FaItalic, FaLink, FaUnderline } from "react-icons/fa"
import Link from '@tiptap/extension-link';

export default function TextEditor({content,onChange}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      Link.configure({
        openOnClick: false, // Don't navigate when clicking links in the editor
        autolink: true,
        defaultProtocol: 'https',
      }),
    ],
    
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    
  })

  const editorState=useEditorState({
    editor,
    selector: ({ editor }) => ({
    isBold: editor.isActive('bold'),
    isItalic: editor.isActive('italic'),
    isH1: editor.isActive('heading', { level: 1 }),
    isUnderline: editor.isActive('underline'),
    isLeft: editor.isActive({ textAlign: 'left' }),
    isCenter: editor.isActive({ textAlign: 'center' }),
    isRight: editor.isActive({ textAlign: 'right' }),
  }),
  })

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  // console.log("editor: ",editor.getHTML());
  

  if (!editor) return null

  return (
    <div>
      <div className="mb-2 flex gap-5 border px-5" >
        <button type='button' className={`px-2 py-1 rounded ${editorState.isBold ? "bg-blue-500 text-white" : ""}`} 
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FaBold/>
        </button>

        <button type='button' className={`px-2 py-1 rounded ${editorState.isItalic ? "bg-blue-500 text-white" : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FaItalic/>
        </button>

        <button type='button' className={`px-2 py-1 rounded ${editorState.isH1 ? "bg-blue-500 text-white" : ""}`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <FaHeading/>
        </button>

        <button type='button' className={`px-2 py-1 rounded ${editorState.isUnderline ? "bg-blue-500 text-white" : ""}`}
          onClick={() =>
            editor.chain().focus().toggleUnderline({ level: 1 }).run()
          }
        >
          <FaUnderline/>
        </button>

        <button type='button' className={`px-2 py-1 rounded ${editorState.isLeft ? "bg-blue-500 text-white" : ""}`}
          onClick={() =>
            editor.chain().focus().setTextAlign('left').run()
          }
        >
          <FaAlignLeft/>
        </button>

        <button type='button' className={`px-2 py-1 rounded ${editorState.isCenter ? "bg-blue-500 text-white" : ""}`}
          onClick={() =>
            editor.chain().focus().setTextAlign('center').run()
          }
        >
          <FaAlignCenter/>
        </button>

        <button type='button' className={`px-2 py-1 rounded ${editorState.isRight ? "bg-blue-500 text-white" : ""}`}
          onClick={() =>
            editor.chain().focus().setTextAlign('right').run()
          }
        >
          <FaAlignRight/>
        </button>

        <button type="button" className={`p-2 rounded ${editor.isActive('link') ? "bg-blue-500 text-white" : ""}`}
        onClick={() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('Enter URL', previousUrl);

        if (url === null) return;

        if (url === '') {
          editor.chain().focus().unsetLink().run();
          return;
        }

        editor.chain().focus().setLink({ href: url }).run();
        }}
        >
          <FaLink/>
        </button>

      </div>

      <EditorContent editor={editor} placeholder='write' className='tiptap min-h-72 mb-6 border-2 p-5 text-xl'/>
    </div>
  )
}