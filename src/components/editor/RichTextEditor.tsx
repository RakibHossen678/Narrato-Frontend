import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import { useEffect } from "react";
import { Button } from "../ui/Button";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onAutosave?: (value: string) => void;
}

export const RichTextEditor = ({
  value,
  onChange,
  onAutosave,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      Youtube,
      Heading,
      Blockquote,
      CodeBlock,
      Placeholder.configure({
        placeholder: "Write your story with depth and clarity...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[260px] rounded-b-xl border border-slate-700 bg-slate-950 p-4 text-slate-100 focus:outline-none light:border-slate-200 light:bg-white light:text-slate-900",
      },
    },
    onUpdate: ({ editor: activeEditor }) => {
      onChange(activeEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!onAutosave) {
      return;
    }

    const timer = setInterval(() => {
      if (editor) {
        onAutosave(editor.getHTML());
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [editor, onAutosave]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-700 light:border-slate-200">
      <div className="flex flex-wrap gap-2 border-b border-slate-700 p-3 light:border-slate-200">
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          Underline
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
