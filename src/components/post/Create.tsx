import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationCreatePost } from '../../lib/graphql/mutations';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Tiptap } from '../../Elements/Tiptap/TiptapEditor';
import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';
import { FaWindowClose } from 'react-icons/fa';
import { checkFileExtension, uploadFile } from '../../lib/firebase/storage';
import { useUserContext } from '../../Provider/UserProvider';
import { toastError, toastPromise } from '../../Elements/Toast/Toast';
import { useThemeContext } from '../../Provider/ThemeProvider';
import { Post } from '../../types/Post';

type props={
  onAddPost: (post: Post) => void
};

export const PostCreate:React.FC<props> = ({onAddPost}) => {

  const {user} = useUserContext()
  const {currTheme} = useThemeContext()
  const [showPopup, setShowPopup] = useState(false);

  const [text, setText] = useState('')
  const [attachmentLink, setAttachmentLink] = useState("")
  const [attachmentFile, setAttachmentFile] = useState<File>();

  const [createPostFunc, {loading:createPostLoading, data:createPostData}] = useMutation(mutationCreatePost)


  const onSubmitHandle = async ()=>{ 
    if(text == "") return toastError("text must be filled", currTheme)

    try{
      const prom = async ()=>{
        if(attachmentFile != null){
          if(attachmentFile.type === ""){}
          const url = await uploadFile(attachmentFile, user)
          setAttachmentLink(url)
          console.info(url)
        }
        console.info(attachmentLink)
        createPostFunc({
          variables:{
            "input": {
              "Text": text,
              "AttachmentLink": attachmentLink
            }
          }
        }).then((data)=>{
          console.info(data.data.CreatePost)
          console.info(data.data.CreatePost as Post)
          setShowPopup(false)
          onAddPost(data.data.CreatePost as Post)
        })
      }
      toastPromise(prom(), currTheme)
    }catch(error){
      alert(error)
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: text,
  })

  return (
    <div id='postCreate'>
      <h1 onClick={()=>setShowPopup(true)}> 
        Create Post
      </h1>
      {
        showPopup && (
          <div id="postCreatePopup">
            <button onClick={()=>setShowPopup(false)}>
              <Icon config={IconSmall} icon={<FaWindowClose />} />
            </button>
            <h1>Create Post</h1>
            <Tiptap setText={setText} showBar={true} />
            
            <label>add attachment</label>
            <input
                type='file'
                accept='.jpg,.jpeg,.png,.mp4'
                onChange={(e)=>{
                  setAttachmentFile((e.target.files as FileList)[0] as File);
                  console.info(attachmentFile);
                }
              }
              placeholder={"profile photo"}
              />
            <button className='button2' onClick={onSubmitHandle}>create new Post</button>
          </div>
        )
      }
    </div>
  )
}

