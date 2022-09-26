import '../style.sass';

import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorPage } from '../../../Elements/Error/ErrorPage';
import { mutationVisitByLink } from '../../../lib/graphql/mutations';
import { queryUserByLink } from '../../../lib/graphql/queries';
import { useUserContext } from '../../../Provider/UserProvider';
import { User } from '../../../types/User';
import { concatUserName } from '../../../utils/User';
import Connect from '../Connect';
import { Educations } from '../Education/Educations';
import { Experiences } from '../Experience/Experiences';
import Follow from '../Follow';
import { ProfileBanner } from './Banner';
import Block from '../Block';


type props={

};

export const Profile:React.FC<props> = () => {

  const {user : myUser} = useUserContext();
  const userProfileLink = useParams().userProfileLink as string;
  const [myProfile, setMyProfile] = useState(false)


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
      if(userCalled && !userLoading && visitData.VisitByLink.length != userData.UserByLink.Visits.length) userRefetch()
    }
  }, [visitLoading, userLoading, userData])


  if(userLoading) return (<>fetching user data...</>)
  
  if(!userData) return (<ErrorPage text='user not exists' />)
  
  if(myUser.ProfileLink == userProfileLink && !myProfile) setMyProfile(true);
  
  const compareUser = ()=>{
    return myUser.ProfileLink == userProfileLink ? 
      myUser :
      userData.UserByLink as User 
  }

  return (
    <div id="profileWrapper">
      <div id='profile'>
        <ProfileBanner isMyProfile={myProfile} user={compareUser()} />
        <div id="profileContent">
        <h1 className='title1'>{concatUserName(compareUser())}</h1>
        <h2>{compareUser().Email}</h2>
        visited by : {compareUser().Visits?.length}
        {
          !myProfile && (<div id='profileMenu'>
            <Follow userId={userProfileLink} />
            <Connect userId={userProfileLink} />
            <Block userId={userProfileLink} />
          </div>)
        }
        </div>
      </div>
      <Experiences experiences={compareUser().Experiences} myProfile={myProfile}  />
      <Educations educations={compareUser().Educations} myProfile={myProfile} />
    </div>
  )
}

export default Profile
