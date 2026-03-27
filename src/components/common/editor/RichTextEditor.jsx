import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      Placeholder.configure({
        placeholder: placeholder || "Write your story...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[280px] rounded-b-xl border border-slate-200 p-4 outline-none",
      },
    },
    onUpdate: ({ editor: activeEditor }) => {
      onChange(activeEditor.getHTML());
    },
  });

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 p-2">
        <button
          type="button"
          className="rounded bg-slate-100 px-2 py-1 text-xs"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          type="button"
          className="rounded bg-slate-100 px-2 py-1 text-xs"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          type="button"
          className="rounded bg-slate-100 px-2 py-1 text-xs"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          List
        </button>
        <button
          type="button"
          className="rounded bg-slate-100 px-2 py-1 text-xs"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        >
          Code
        </button>
        <button
          type="button"
          className="rounded bg-slate-100 px-2 py-1 text-xs"
          onClick={() => editor?.chain().focus().setParagraph().run()}
        >
          Paragraph
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
