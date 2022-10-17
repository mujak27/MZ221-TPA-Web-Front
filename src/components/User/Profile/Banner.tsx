import '../style.sass';

import { useEffect, useState } from 'react';

import { TypeUser } from '../../../types/TypeUser';
import { fromUrl, getUserBackgroundPhoto, getUserProfilePhoto } from '../../../utils/User';
import ProfileUpdate from './Update';


type props={
  user: TypeUser
  isMyProfile : boolean
};

export const ProfileBanner:React.FC<props> = ({user, isMyProfile}) => {
  const [showUpdate, setShowUpdate] = useState(false)

  return (
      <div id='profileBanner' style={{backgroundImage : fromUrl(getUserBackgroundPhoto(user))}}>
        <div className="userImage" style={{backgroundImage : fromUrl(getUserProfilePhoto(user))}} />
        {isMyProfile && (<button className='button2' onClick={(e)=>{setShowUpdate(true)}} >update</button> )}
        {showUpdate && (<ProfileUpdate setShowUpdate={setShowUpdate} />)}
      </div>
  )
}