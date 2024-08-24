import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit"
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import EditTools from './EditTools'
import Italic from '@tiptap/extension-italic'
import Link from "@tiptap/extension-link"
import Code from "@tiptap/extension-code"
import Highlight from "@tiptap/extension-highlight"
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Underline from "@tiptap/extension-underline"
import Heading from '@tiptap/extension-heading'
import styles from './ContentArea.module.css';
import { Node, mergeAttributes } from '@tiptap/core';
type Props = {
  content: string
  setContent: (newContent: string) => void
}

const ContentArea = ({ content, setContent }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Bold,
      Heading.configure({
        HTMLAttributes: {
          h1: { class: styles.heading1 },
          h2: { class: styles.heading2 },
          h3: { class: styles.heading3 },
        },
        levels: [1, 2, 3],
      }),
      Underline,
      Code.configure(
        {
          HTMLAttributes: {
            class: styles.inlineCode, // Apply CSS module class
          },
        }
      ),
      Italic,
      Highlight.configure({ multicolor: false }),
      Link.configure({
        HTMLAttributes: {
          class: styles.link, // Apply CSS module class
        },
        openOnClick: true
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: styles.bulletList, // Apply CSS module class
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: styles.bulletItem, // Apply CSS module class
        },
      },)
    ],
    content: '<p>Write your Post ...</p>',
    // onUpdate: ({ editor }) => {
    //   // Apply custom classes after updates
    //   editor.commands.setContent(editor.getHTML());
    // },
    autofocus: true,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose focus:outline-none prose-p:loading-0 prose-a:text-red-400 xl:prose-base dark:prose-code:text-white dark:prose-p:text-white dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white dark:prose-strong:text-white dark:prose-italic:text-white"
      }
    },
    editable: true,
    immediatelyRender: false,
  })

  if (!editor) {
    return null
  }

  const html = editor.getHTML()

  setContent(html)
  console.log(content)
  return (
    <div>
      <EditTools editor={editor} />
      <div className='py-4'>
        <EditorContent className='p-4 border-red-400 border-[1px] rounded-md border-dotted' editor={editor} />
      </div>
    </div>
  )
}

export default ContentArea