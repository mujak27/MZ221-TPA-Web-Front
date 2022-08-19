import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { queryIsFollow, queryUser } from '../../lib/graphql/queries';
import { useContextProvider } from '../../Provider/ContextProvider';
import { User } from '../../types/User';
import Connect from './Connect';
import Follow from './Follow';


type props={

};

export const Profile:React.FC<props> = () => {

  const {user : myUser} = useContextProvider();
  const userId = useParams().profileId as string;


  const {called: userCalled, loading: userLoading, data : userData} = useQuery(queryUser, {
    variables: {
      input: userId
    }
  });

  
  if(myUser.ID == userId) return (<Navigate to={"/myProfile"} />)

  if(userLoading) return (<>fetching user data...</>)

  if(!userData) return (<>user not exist</>)

  const user = userData.user as User;

  return (
    <div className="profileWrapper">
      <div className='profile'>
        <div>
          name : {user.FirstName + user.MidName + user.LastName}
        </div>
        <div>
          email : {user.Email}
        </div>
      </div>
      <Follow userId={userId} />
      <Connect userId={userId} />
    </div>
  )
}

export default Profile
