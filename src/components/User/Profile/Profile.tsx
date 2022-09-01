import '../style.sass';

import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { mutationVisit, mutationVisitByLink } from '../../../lib/graphql/mutations';
import { queryUserByLink } from '../../../lib/graphql/queries';
import { useUserContext } from '../../../Provider/UserProvider';
import { User } from '../../../types/User';
import { concatUserName, fromUrl, getUserBackgroundPhoto, getUserProfilePhoto } from '../../../utils/User';
import Connect from '../Connect';
import { Educations } from '../Education/Educations';
import { Experiences } from '../Experience/Experiences';
import Follow from '../Follow';
import ProfileUpdate from './Update';
import { ErrorPage } from '../../../Elements/Error/ErrorPage';


type props={

};

export const Profile:React.FC<props> = () => {

  const {user : myUser, userRefetch : myUserRefetch} = useUserContext();
  const userProfileLink = useParams().userProfileLink as string;
  const [myProfile, setMyProfile] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)


  const {called: userCalled, loading: userLoading, data : userData, refetch : userRefetch} = useQuery(queryUserByLink, {
    variables: {
      "link": userProfileLink
    }
  });

  const [visitFunc, {loading : visitLoading, data: visitData}] = useMutation(mutationVisitByLink)


  useEffect(()=>{
    visitFunc({
      variables:{
        "ProfileLink": userProfileLink
      }
    })
  }, [])

  
  useEffect(()=>{
    if(visitData && userData){
      if(userCalled && !userLoading && visitData.VisitByLink.length != user.Visits.length) userRefetch()
    }
  }, [visitLoading, userLoading, userData])


  if(userLoading) return (<>fetching user data...</>)
  
  if(!userData) return (<ErrorPage text='user not exists' />)
  
  const user = userData.UserByLink as User;

  console.info(myUser.ID)
  console.info(user.ID)
  if(myUser.ProfileLink == userProfileLink && !myProfile) setMyProfile(true);

  return (
    <div id="profileWrapper">
      <div id='profile'>
        <div id='profileBanner' style={{backgroundImage : fromUrl(getUserBackgroundPhoto(user))}}>
          <img className='userImage' src={getUserProfilePhoto(user)} />
          {myProfile && (<button className='button2' onClick={(e)=>{setShowUpdate(true)}} >update</button> )}
          {showUpdate && (<ProfileUpdate setShowUpdate={setShowUpdate} />)}
        </div>
          <div id="profileContent">
          <h1 className='title1'>{concatUserName(user)}</h1>
          <h2>{user.Email}</h2>
          visited by : {user.Visits.length}
          {
            !myProfile && (<div id='profileMenu'>
              <Follow userId={userProfileLink} />
              <Connect userId={userProfileLink} />
            </div>)
          }
        </div>
      </div>
      <Experiences experiences={user.Experiences} myProfile={myProfile}  />
      <Educations educations={user.Educations} myProfile={myProfile} />
    </div>
  )
}

export default Profile
