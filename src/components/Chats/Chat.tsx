import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { querySearch, queryUsersByName } from '../../lib/graphql/queries';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import { CreatePost } from '../posts/CreatePost';
import { Posts } from '../posts/Posts';
import Profile from '../User/Profile';
import { SearchBar } from '../User/SearchBar';
import { ChatBox } from './Box';
import { ChatList } from './List';

type props={

};

export const Chat:React.FC<props> = () => {

  const [showList, setShowList] = useState(false)
  const [showBox, setShowBox] = useState(false)
  const [boxUser, setBoxUser] = useState<User>()

  const onOpenBox = (user : User)=>{
    setShowBox(true)
    setBoxUser(user)
  }

  return (
    <div>
      <button onClick={()=>{setShowList(!showList)}}>chat</button>
      {
        showList && (<ChatList onOpenBox={onOpenBox} />)
      }
      {
        showBox && (<ChatBox user={boxUser as User}/>)
      }
    </div>
  )
}

