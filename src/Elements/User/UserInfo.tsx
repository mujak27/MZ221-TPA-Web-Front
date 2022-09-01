import './style.sass';

import React, { useEffect, useState } from 'react';

import { User } from '../../types/User';
import { concatUserName } from '../../utils/User';
import { UserProfilePhoto } from './UserProfilePhoto';
import { Navigate } from 'react-router-dom';

type props={
  user : User
  showDetail : boolean
};

export const UserInfo:React.FC<props> = ({user, showDetail}) => {

  const [navigate, setNavigate] = useState(false)

  if(navigate){
    return <Navigate to={`/profile/${user.ProfileLink}`} />
  }


  return (
    <div className='userInfo' onClick={()=>{setNavigate(true)}}>
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

