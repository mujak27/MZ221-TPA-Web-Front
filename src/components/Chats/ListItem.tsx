import React, { useEffect, useState } from 'react';
import { UserInfo } from '../../Elements/User/UserInfo';
import { UserProfilePhoto } from '../../Elements/User/UserProfilePhoto';
import { useUserContext } from '../../Provider/UserProvider';
import { getUserMessage, Message } from '../../types/Message';

import { TypeUser } from '../../types/TypeUser';
import { concatUserName } from '../../utils/User';

type props={
  message : Message
  onOpenBox : (user: TypeUser) => void
};

export const ChatListItem:React.FC<props> = ({message, onOpenBox}) => {

  const {user: myUser} = useUserContext()
  const connectedUser = getUserMessage(message, myUser.ID)

  return (
    <button onClick={()=>onOpenBox(connectedUser)} className='chatListItem'>
      <div className='userInfo' >
        <UserProfilePhoto user={connectedUser} />
          <div className='userInfoText'>
            <h4>
            {concatUserName(connectedUser)}
            </h4>
            {message.Text}
          </div>
      </div>
    </button>
  )
}

