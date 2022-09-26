import './style.sass';

import { useLazyQuery } from '@apollo/client';
import Mention from '@tiptap/extension-mention';
import Underline from '@tiptap/extension-underline';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { FaBold, FaHeading, FaItalic, FaListOl, FaListUl, FaQuoteLeft, FaStrikethrough, FaUnderline } from 'react-icons/fa';

import { queryUsersByName } from '../../lib/graphql/queries';
import { User } from '../../types/User';
import Suggestions from './Suggestion';
import {Hashtag} from './Hashtags'
import Suggestion from './Suggestion';

type props = {
  editor : any
}

const MenuBar:React.FC<props> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is_active" : ""
          }
        >
          <FaHeading />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is_active" : ""
          }
        >
          <FaHeading className="heading3" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <FaQuoteLeft />
        </button>
      </div>
    </div>
  );
};

export const Tiptap:React.FC<{setText : React.Dispatch<React.SetStateAction<string>>, showBar : boolean}>  = ({ setText, showBar }) => {

  const [name, setName] = useState("")
  
  
  const [funcUsersByName, {loading : loadingUsersByName, data : dataUsersByName}] = useLazyQuery(queryUsersByName)

  const users = dataUsersByName as User[]

  const editor = useEditor({
    extensions: [
    StarterKit,
    Underline,
    // Mention.configure({
    //   HTMLAttributes: {
    //     class: 'mention',
    //   },
    //   suggestion : !loadingUsersByName ? Suggestions({users, setName}) : Suggestions({users : [], setName}),
    // }),
    Hashtag.configure({
      HTMLAttributes:{
        class: 'mention',
      },
      suggestion: Suggestion
    })
  ],
  content: ``,
  onUpdate: ({ editor }) => {
    const html = editor.getHTML();
    setText(html);
  },
  })

  return (
    <div className="textEditor">
      {showBar && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};