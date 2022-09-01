import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryMessages, querySearch, queryUsersByName } from '../../lib/graphql/queries';
import { useUserContext } from '../../Provider/UserProvider';
import { Message } from '../../types/Message';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { concatUserName } from '../../utils/User';
import { Navbar } from '../Nav/Navbar';
import { PostCreate } from '../post/Create';
import { Posts } from '../post/Posts';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../Nav/SearchBar';
import { MessageCreate } from './Message/Create';
import { MessageItem } from './Message/Item';
import { VideoCall } from './VideoCall/VideoCall';
import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';
import { BsFillCameraVideoFill } from 'react-icons/bs';

type props={
  user : User
};

export const ChatBox:React.FC<props> = ({user}) => {
  const {user : myUser} = useUserContext()
  const [showVideoCall, setShowVideoCall] = useState(false)

  const {loading : messagesLoading, data : messagesData, refetch : messagesRefetch, called} = useQuery(queryMessages, {
    variables: {
      "id1": myUser.ID,
      "id2": user.ID
    },
    pollInterval: 1000,
  })
  if(messagesLoading) return <>fetching data...</>

  const messages = messagesData.Messages as Message[]
  
  return (
    <div id='chatBox'>
      <div id="chatBoxHeader">
        {concatUserName(user)}
        <div id="chatBoxMenu">
          <button onClick={()=>setShowVideoCall(!showVideoCall)}> <Icon  config={IconSmall} icon={<BsFillCameraVideoFill />} /></button>
        </div>
      </div>
      <div id="chatMessages">
        {
          messages.map((message)=>{
            return <MessageItem key={crypto.randomUUID()} message={message} />
          })
        }
      </div>
      <div>

      <MessageCreate user={user} messagesRefetch={messagesRefetch} />
      {
        showVideoCall && <VideoCall user={user} />
      }
      </div>
    </div>
  )
}

