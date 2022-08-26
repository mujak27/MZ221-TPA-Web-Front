import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryMessages, querySearch, queryUsersByName } from '../../lib/graphql/queries';
import { useContextProvider } from '../../Provider/ContextProvider';
import { Message } from '../../types/Message';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { concatUserName } from '../../utils/User';
import { Navbar } from '../Nav/Navbar';
import { PostCreate } from '../post/Create';
import { Posts } from '../post/Posts';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../User/SearchBar';
import { MessageCreate } from './Message/Create';
import { MessageItem } from './Message/Item';
import { VideoCall } from './VideoCall/VideoCall';

type props={
  user : User
};

export const ChatBox:React.FC<props> = ({user}) => {
  const {user : myUser} = useContextProvider()

  const {loading : messagesLoading, data : messagesData, refetch : messagesRefetch, called} = useQuery(queryMessages, {
    variables: {
      "id1": myUser.ID,
      "id2": user.ID
    },
    pollInterval: 1000,
  })
  if(messagesLoading) return <>fetching data...</>

  console.info(messagesData)
  const messages = messagesData.Messages as Message[]
  
  return (
    <div>
      chat with {concatUserName(user)}
      {
        messages.map((message)=>{
          return <MessageItem key={crypto.randomUUID()} message={message} />
        })
      }
      <MessageCreate user={user} messagesRefetch={messagesRefetch} />
      <VideoCall user={user} />
    </div>
  )
}

