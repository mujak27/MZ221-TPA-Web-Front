import { useMutation } from '@apollo/client';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { BiShareAlt } from "react-icons/bi";
import { useUserContext } from '../../Provider/UserProvider';
import { useMiscContext } from '../../Provider/MiscProvider';
import { useThemeContext } from '../../Provider/ThemeProvider';
import { mutationSendMessage, typeMSendMessage } from '../../lib/graphql/mutations';
import { toastPromise } from '../../Elements/Toast/Toast';
import { TypeUser } from '../../types/TypeUser';
import { UserSearch } from './Search';
import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';
import { enumMessageType } from '../../types/Message';

type props={
  userId : string
};

export const Share:React.FC<props> = ({userId}) => {

  const {user: myUser} = useUserContext()
  const {currTheme} = useThemeContext()
  const {setShowPopup} = useMiscContext()

  const [sendMessageFunc] = useMutation(mutationSendMessage)

  const onSendMessage = async (user : TypeUser)=>{
    setShowPopup(false)
    toastPromise(
      sendMessageFunc({
        variables:{
          "input": {
            text: userId,
            user1Id: myUser.ID ,
            user2Id: user.ID,
            imageLink : "",
            messageType : enumMessageType.user
          } as typeMSendMessage
        }
      }),
      currTheme
    )
  }
  
  return ( 
    <UserSearch
      body={
        <div className="button2">
          <Icon config={IconSmall} icon={<BiShareAlt />} />
        </div>
      } 
      title='share this post' 
      onClickHandle ={onSendMessage} />
  )
}

