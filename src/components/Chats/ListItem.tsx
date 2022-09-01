import React, { useEffect, useState } from 'react';

import { User } from '../../types/User';
import { concatUserName } from '../../utils/User';

type props={
  connectedUser : User
  onOpenBox : (user: User) => void
};

export const ChatListItem:React.FC<props> = ({connectedUser, onOpenBox}) => {

  return (
    <button onClick={()=>onOpenBox(connectedUser)} className='chatListItem'>
      {concatUserName(connectedUser)}
    </button>
  )
}

