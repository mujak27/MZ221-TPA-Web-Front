
import React, { useEffect, useState } from 'react';
import { checkLinkExtension, enumFileType } from '../../lib/firebase/storage';

type props={
  attachmentLink : string
};

export const Media:React.FC<props> = ({attachmentLink}) => {

  if(!attachmentLink || attachmentLink=="") return <></>
  return <div className='media'>
    {
      checkLinkExtension(attachmentLink) === enumFileType.picture ? 
        <img src={attachmentLink} alt="photo" /> : 
        <video loop controls src={attachmentLink} autoPlay={true} title="video" />
    }
  </div>


}
