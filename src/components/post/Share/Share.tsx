import { useMutation } from '@apollo/client';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { BiShareAlt } from "react-icons/bi";
import { mutationSendMessage, typeMSendMessage } from '../../../lib/graphql/mutations';
import { useUserContext } from '../../../Provider/UserProvider';
import { Icon } from '../../../styles/Icon/IconContext';
import { IconSmall } from '../../../styles/Icon/IconStyles';
import { enumMessageType } from '../../../types/Message';
import { User } from '../../../types/User';
import { UserSearch } from '../../User/Search';
import { toastPromise } from '../../../Elements/Toast/Toast';
import { useThemeContext } from '../../../Provider/ThemeProvider';
import { useMiscContext } from '../../../Provider/MiscProvider';
import { Post } from '../../../types/Post';

type props={
  post : Post
};

export const PostShare:React.FC<props> = ({post}) => {

  const {user: myUser} = useUserContext()
  const {currTheme} = useThemeContext()
  const {setShowPopup} = useMiscContext()

  const [sendMessageFunc] = useMutation(mutationSendMessage)

  const onSendMessage = async (user : User)=>{
    setShowPopup(false)
    toastPromise(
      sendMessageFunc({
        variables:{
          "input": {
            text: post.ID,
            user1Id: myUser.ID ,
            user2Id: user.ID,
            imageLink : "",
            messageType : enumMessageType.post
          } as typeMSendMessage
        }
      }),
      currTheme
    )
  }
  
  return ( 
    <UserSearch 
      body={<Icon config={IconSmall} icon={<BiShareAlt />} />} 
      title='share this post' 
      onClickHandle ={onSendMessage} />
  )
}

