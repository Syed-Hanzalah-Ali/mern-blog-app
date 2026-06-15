import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'


export default function TextEditor({onChange}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
    ],
    
    content: '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    
  })

  // console.log("editor: ",editor.getHTML());
  

  if (!editor) return null

  return (
    <div>
      <div className="mb-2 flex gap-5 border px-5" >
        <button type='button' className='font-bold' 
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>

        <button type='button' className=' italic'
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>

        <button type='button' className='font-bold'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>

        <button type='button' className=' underline'
          onClick={() =>
            editor.chain().focus().toggleUnderline({ level: 1 }).run()
          }
        >
          U
        </button>

        <button type='button' className='font-bold underline'
          onClick={() =>
            editor.chain().focus().setTextAlign('left').run()
          }
        >
          left
        </button>

        <button type='button' className='font-bold underline'
          onClick={() =>
            editor.chain().focus().setTextAlign('center').run()
          }
        >
          center
        </button>

        <button type='button' className='font-bold underline'
          onClick={() =>
            editor.chain().focus().setTextAlign('right').run()
          }
        >
          right
        </button>

      </div>

      <EditorContent editor={editor} placeholder='write' className='tiptap h-72 mb-6 border-2 p-5 text-xl'/>
    </div>
  )
}