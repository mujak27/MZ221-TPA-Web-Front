import './style.sass';

import React, { useEffect, useState } from 'react';

import { User } from '../../types/User';
import { concatUserName } from '../../utils/User';
import { UserProfilePhoto } from './UserProfilePhoto';

type props={
  user : User
  showDetail : boolean
};

export const UserInfo:React.FC<props> = ({user, showDetail}) => {

  return (
    <div className='userInfo'>
      <UserProfilePhoto user={user} />
      {
        showDetail && 
        <div>
          {concatUserName(user)}
          {user.Location && user.Location != "" && (<><br />{user.Location}</>)}
        </div>
      }
    </div>
  )

}

