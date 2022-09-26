import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import { queryConnectedUsers, queryRecentMessages } from '../../lib/graphql/queries';
import { Message } from '../../types/Message';
import { User } from '../../types/User';
import { UserSearch } from '../User/Search';
import { ChatListItem } from './ListItem';

type props={
  onOpenBox : (user: User) => Promise<void>
};

export const ChatList:React.FC<props> = ({onOpenBox}) => {

  const {loading : recentMessagesLoading, data : recentMessagesData} = useQuery(queryRecentMessages)

  if(recentMessagesLoading) return <>fetching data...</>

  const messages = recentMessagesData.RecentMessage as Message[]

  return (
    <div id='chatList'>
      <UserSearch 
        body={<div className='button3'>search user</div>}
        onClickHandle={onOpenBox}
        title={"new chat"}
        />
      {
        messages.map((message)=>{
          return <ChatListItem key={crypto.randomUUID()} onOpenBox={onOpenBox} message={message} />
        })
      }
    </div>
  )
}

