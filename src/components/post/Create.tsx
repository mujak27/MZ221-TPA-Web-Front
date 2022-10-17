import { useMutation } from '@apollo/client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';

import { InputFile } from '../../Elements/Inputs/file';
import { Tiptap } from '../../Elements/Tiptap/TiptapEditor';
import { toastError, toastPromise } from '../../Elements/Toast/Toast';
import { uploadFile } from '../../lib/firebase/storage';
import { mutationCreatePost } from '../../lib/graphql/mutations';
import { useThemeContext } from '../../Provider/ThemeProvider';
import { useUserContext } from '../../Provider/UserProvider';
import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';
import { TypePost } from '../../types/TypePost';
import { stringTagsStripper } from '../../utils/validation';

type props={
  onAddPost: (post: TypePost) => void
};

export const PostCreate:React.FC<props> = ({onAddPost}) => {

  const {user} = useUserContext()
  const {currTheme} = useThemeContext()
  const [showPopup, setShowPopup] = useState(false);

  const [text, setText] = useState('')
  const [attachmentFile, setAttachmentFile] = useState<File>();

  const [createPostFunc] = useMutation(mutationCreatePost)

  const onSubmitHandle = async ()=>{ 
    if( stringTagsStripper(text) == "") return toastError("text must be filled", currTheme)

    try{
      toastPromise((async ()=>{
        const url = attachmentFile != null ? await uploadFile(attachmentFile, user) : ""
        createPostFunc({
          variables:{
            "input": {
              "Text": text,
              "AttachmentLink": url
            }
          }
        }).then((data)=>{
          setShowPopup(false)
          onAddPost(data.data.CreatePost as TypePost)
        })
      })(), currTheme)
    }catch(error : any){
      toastError(error, currTheme)
    }
  }

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
            {/* <input type={"text"} value={text} onChange={(e)=>{setText(e.target.value)}} /> */}
            <Tiptap setText={setText} showBar={true} />
            
            <InputFile
              attachmentFile={attachmentFile}
              setAttachmentFile={setAttachmentFile}
              accept='.jpg,.jpeg,.png,.mp4'
              title='media' />
            <button className='button2' onClick={onSubmitHandle}>create new Post</button>
          </div>
        )
      }
    </div>
  )
}

