import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { mutationVisit } from '../../lib/graphql/mutations';
import { queryIsFollow, queryUser } from '../../lib/graphql/queries';
import { useContextProvider } from '../../Provider/ContextProvider';
import { User } from '../../types/User';
import Connect from './Connect';
import { Educations } from './Education/Educations';
import { Experiences } from './Experience/Experiences';
import Follow from './Follow';


type props={

};

export const Profile:React.FC<props> = () => {

  const {user : myUser, userRefetch : myUserRefetch} = useContextProvider();
  const userId = useParams().profileId as string;
  const [myProfile, setMyProfile] = useState(false)


  const {called: userCalled, loading: userLoading, data : userData, refetch : userRefetch} = useQuery(queryUser, {
    variables: {
      input: userId
    }
  });

  const [visitFunc, {loading : visitLoading, data: visitData}] = useMutation(mutationVisit)


  useEffect(()=>{
    visitFunc({
      variables:{
        id: userId
      }
    })
  }, [])

  
  useEffect(()=>{
    if(visitData && userData){
      if(visitData.Visit.length != user.Visits.length) userRefetch()
    }
  }, [visitLoading, userLoading])

  
  if(myUser.ID == userId && !myProfile) setMyProfile(true);

  if(userLoading) return (<>fetching user data...</>)

  if(!userData) return (<>user not exist</>)

  const user = userData.user as User;

  return (
    <div className="profileWrapper">
      <div className='profile'>
        <div>
          name : {user.FirstName + user.MidName + user.LastName}
          visited by : {user.Visits.length}
        </div>
        <div>
          email : {user.Email}
        </div>
      </div>
      <Follow userId={userId} />
      <Connect userId={userId} />
      {
        user && (
          <>
            <Experiences experiences={user.Experiences} myProfile={myProfile}  />
            <Educations educations={user.Educations} myProfile={myProfile} />
          </>
        )
      }
    </div>
  )
}

export default Profile
