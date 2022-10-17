import React, { useEffect, useState } from 'react';

import { Media } from '../../../Elements/Media/Media';
import { UserInfo } from '../../../Elements/User/UserInfo';
import { useUserContext } from '../../../Provider/UserProvider';
import { enumMessageType, Message } from '../../../types/Message';
import { PostItem } from '../../post/Item';

type props={
  message : Message
};

export const MessageItem:React.FC<props> = ({message}) => {

  const {user} = useUserContext()

  const messageContent = (()=>{
    switch(message.messageType){
      case enumMessageType.text:
        return <>{message.Text}</>
      case enumMessageType.post:
        return <PostItem postId={message.Text} showExtras={true} />
      case enumMessageType.user:
        return <UserInfo userId={message.Text} showDetail={true} showPopup={false}/> 
        // return message.Text
    }
  })()

  return ( 
    <div className={`messageItem ${message.User1.ID == user.ID ? 'myMessageItem' : ''}`}>
      {messageContent}
      {
        message.imageLink && <Media attachmentLink={message.imageLink} />
      }
    </div>
  )
}

