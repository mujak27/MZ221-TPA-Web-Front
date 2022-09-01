
import React, { useEffect, useState } from 'react';
import { checkLinkExtension, enumFileType } from '../../lib/firebase/storage';

type props={
  attachmentLink : string
};

export const PostMedia:React.FC<props> = ({attachmentLink}) => {

  console.info(attachmentLink)
  if(!attachmentLink || attachmentLink=="") return <></>

  // if(checkLinkExtension(attachmentLink) === enumFileType.picture){
  //   return <img src={attachmentLink} />
  // } else{
  //   return <video controls src={attachmentLink} autoPlay={true} />
  // }

  return <div className='postMedia'>
    {
      checkLinkExtension(attachmentLink) === enumFileType.picture ? 
        <img src={attachmentLink} /> : 
        <video loop controls src={attachmentLink} autoPlay={true} />
    }
  </div>


}
