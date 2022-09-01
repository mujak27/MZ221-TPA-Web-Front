import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryConnectedUsers, querySearch, queryUsersByName } from '../../lib/graphql/queries';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import { PostCreate } from '../post/Create';
import { Posts } from '../post/Posts';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../Nav/SearchBar';
import { ChatListItem } from './ListItem';

type props={
  onOpenBox : (user: User) => void
};

export const ChatList:React.FC<props> = ({onOpenBox}) => {

  const {loading : connectedUsersLoading, data : connectedUsersData} = useQuery(queryConnectedUsers, {})

  if(connectedUsersLoading) return <>fetching data...</>

  const connectedUsers = connectedUsersData.ConnectedUsers as User[]


  return (
    <div id='chatList'>
      <div id="chatListHeader">
        <h1>chat with connected people</h1>
      </div>
      {
        connectedUsers.map((connectedUser)=>{
          return <ChatListItem key={crypto.randomUUID()} onOpenBox={onOpenBox} connectedUser={connectedUser} />
        })
      }
    </div>
  )
}

