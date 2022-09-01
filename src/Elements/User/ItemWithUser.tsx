import './style.sass';

import React, { ReactNode, useEffect, useState } from 'react';

import { User } from '../../types/User';
import { concatUserName } from '../../utils/User';
import { UserProfilePhoto } from './UserProfilePhoto';
import { UserInfo } from './UserInfo';

type props={
  user : User
  content : ReactNode
};

export const ItemWithUser:React.FC<props> = ({content, user}) => {

  return (
    <div className='itemWithUser'>
      <UserInfo showDetail={true} user={user} />
      { content }
    </div>
  )

}

