import './style.sass';

import React, { useEffect, useState } from 'react';

import { User } from '../../types/User';
import { concatUserName } from '../../utils/User';
import { UserProfilePhoto } from './UserProfilePhoto';
import { Navigate } from 'react-router-dom';
import { Tippy } from '../Tippy/Tippy';
import { useMiscContext } from '../../Provider/MiscProvider';
import Connect from '../../components/User/Connect';

type props={
  user : User
  showDetail? : boolean
  showConnect? : boolean
  isNavigate? : boolean
};

export const UserInfo:React.FC<props> = ({user, showDetail, showConnect, isNavigate = true}) => {

  const [navigate, setNavigate] = useState(false)
  const {setShowTooltip} = useMiscContext()

  if(isNavigate && navigate){
    setShowTooltip(false)
    return <Navigate to={`/profile/${user.ProfileLink}`} />
  }


  return (
    <Tippy 
        body={
          <div className='userInfo' >
            <div onClick={()=>{setNavigate(true)}}>
              <UserProfilePhoto user={user} />
            </div>
            {
              showDetail && 
              <div className='userInfoText'>
                <h4>
                {concatUserName(user)}
                </h4>
                {user.About && user.About != "" && (<>{user.About}</>)}
              </div>
            }
            {
              showConnect && 
              <div className='absoluteRight'>
                <Connect userId={user.ID} />
              </div>
            }
          </div>
        }
        popup={
          <div className='userInfoPopup'>
            <UserProfilePhoto user={user} />
            <div>
              <h4>
                {concatUserName(user)}
              </h4>
              {
                user.About != "" && (
                  <p>{user.About}</p>
                )
              }
            </div>
          </div>
        }
        />
  )

}

