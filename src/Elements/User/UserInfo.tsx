import './style.sass';

import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Connect from '../../components/User/Connect';
import { queryUser } from '../../lib/graphql/queries';
import { useMiscContext } from '../../Provider/MiscProvider';
import { TypeUser } from '../../types/TypeUser';
import { concatUserName } from '../../utils/User';
import { Tippy } from '../Tippy/Tippy';
import { UserProfilePhoto } from './UserProfilePhoto';

type props={
  user? : TypeUser
  userId? : string
  showDetail? : boolean
  showConnect? : boolean
  isNavigate? : boolean
  showPopup? : boolean
};

export const UserInfo:React.FC<props> = ({user, userId, showDetail, showConnect, isNavigate = true, showPopup = true}) => {

  // const [navigate, setNavigate] = useState(false)
  const {setShowTooltip} = useMiscContext()
  const nav = useNavigate()


  
  const {loading, data : userData, error} = useQuery(queryUser, {
    variables: {
      input: userId
    }
  })

  if(loading) return <>...</>

  
  const _user = userId && !error && userData ? userData.user as TypeUser : user as TypeUser

  const body = <div className='userInfo' >
    <div onClick={()=>{nav(`/profile/${_user.ProfileLink}`)}}>
      <UserProfilePhoto user={_user} />
    </div>
    {
      showDetail && 
      <div className='userInfoText'>
        <h4>
        {concatUserName(_user)}
        </h4>
        {_user.About && _user.About != "" && (<>{_user.About}</>)}
      </div>
    }
    {
      showConnect && 
      <div className='absoluteRight'>
        <Connect userId={_user.ID} />
      </div>
    }
  </div>

  return showPopup ? 
    <Tippy 
    body={body}
    popup={
      <div className='userInfoPopup'>
        <UserProfilePhoto user={_user} />
        <div>
          <h4>
            {concatUserName(_user)}
          </h4>
          {
            _user.About != "" && (
              <p>{_user.About}</p>
            )
          }
        </div>
      </div>
    }
    /> : body

}

