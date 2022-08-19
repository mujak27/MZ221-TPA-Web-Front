import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { queryUser } from '../../lib/graphql/queries';
import { useContextProvider } from '../../Provider/ContextProvider';
import { User } from '../../types/User';


type props={

};

export const MyProfile:React.FC<props> = () => {

  const {user} = useContextProvider();


  return (
    <div className="profileWrapper">
      <div className='profile'>
        <h1>my profile:</h1>
        <div>
          name : {user.FirstName + user.MidName + user.LastName}
        </div>
        <div>
          email : {user.Email}
        </div>
      </div>
      
    </div>
  )
}

export default MyProfile
