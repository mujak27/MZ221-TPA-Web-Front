import "./style.sass"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaRegFileImage, FaRegWindowClose } from 'react-icons/fa';
import { checkFileExtension, enumFileType } from '../../lib/firebase/storage';

import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';
import { Tippy } from '../Tippy/Tippy';
import { trimText } from "../../utils/strings";

type props={
  attachmentFile: File | undefined
  setAttachmentFile: React.Dispatch<React.SetStateAction<File | undefined>>
  title?: string
  accept: string
};


export const InputFile:React.FC<props> = ({attachmentFile, setAttachmentFile, accept, title}) => {


  const onRemoveAttachment = ()=>{
    if(attachmentFile !=undefined) setAttachmentFile(undefined)
  }

  
  const media = useMemo(()=>{
    return attachmentFile ? (()=>{
      return checkFileExtension(attachmentFile) == enumFileType.picture ? 
        <img style={{width:'200px'}} src={URL.createObjectURL(attachmentFile)} alt="photo" /> : 
        <video style={{width:'200px'}} loop controls src={URL.createObjectURL(attachmentFile)} autoPlay title="video" />
    })()  :
    <></>
  }, [attachmentFile])


  return (
    <div className='inputFile'>
      <div className='button3' 
      >
        <label>
          <input
              style={{display:"none"}}
              type='file'
              accept={accept}
              onChange={(e)=>setAttachmentFile((e.target.files as FileList)[0] as File)}
              placeholder={title}
              disabled={attachmentFile ? true : false}
              />
            <Icon config={IconSmall} icon={<FaRegFileImage />} />
            <div>
              <>
              {title} <br/>
              </>
            </div>
        </label>
      </div>
      {
        attachmentFile && (
          <>
          <Tippy
            body={<div onClick={onRemoveAttachment} className='button3'>
                <Icon config={IconSmall} icon={<FaRegWindowClose />} />
                {trimText(attachmentFile.name, 5)}
              </div>}
            popup={media}
            />
          </>
          
        )
      }
    </div>
  )
}

