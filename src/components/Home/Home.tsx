import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryUsersByName } from '../../lib/graphql/queries';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import { Posts } from '../posts/Posts';
import MyProfile from '../User/MyProfile';
import Profile from '../User/Profile';
import { SearchBar } from '../User/SearchBar';

type props={

};

export const Home:React.FC<props> = () => {

  const [processing, setProcessing] = useState(false);
  const [users, setUsers] = useState<Array<User>>([])
  
  const [usersByName, {loading: loadingUsersByName, data: usersByNameData, called:calledUsersByName}] = useLazyQuery(queryUsersByName);

  
  
  const onSearchHandle = (searchString : string)=>{
    try{
      setProcessing(true);
      usersByName({
        variables:{
          name: searchString
        }
      })
      console.info('search');
    }catch(err){
      console.info(err);
    }
  }
  
  useEffect(()=>{
    if(!loadingUsersByName){
      if(processing){
        setProcessing(false);
        setUsers(usersByNameData.UsersByName as User[]);
        console.info(usersByNameData)
      }
    }
  }, [usersByNameData, processing])

  return (
    <div>
      <Navbar 
        users={users} setUsers={setUsers} showPopup={calledUsersByName && !loadingUsersByName} onSearchHandle={onSearchHandle} 
        />
      <Routes>
        <Route path='/' element={<Posts></Posts>} />
        <Route path="/myProfile" element={<MyProfile/>} />
        <Route path="/profile/:profileId" element={<Profile />} />
      </Routes>
    </div>
  )
}

