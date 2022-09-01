import { ApolloQueryResult, useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationSendMessage } from '../../../lib/graphql/mutations';
import { useUserContext } from '../../../Provider/UserProvider';
import { Message } from '../../../types/Message';
import { User } from '../../../types/User';
import { concatUserName } from '../../../utils/User';

type props={
  user : User
  messagesRefetch : (variables?: Partial<{
    id1: string;
    id2: string;
}> | undefined) => Promise<ApolloQueryResult<any>>
};

export const MessageCreate:React.FC<props> = ({user, messagesRefetch}) => {
  const {user : myUser} = useUserContext()

  const [text, setText] = useState("")

  const [sendMessageFunc, {loading : sendMessageLoading, called : sendMessageCalled}] = useMutation(mutationSendMessage)

  const onSendMessage = ()=>{
    sendMessageFunc({
      variables:{
        "input": {
          "Text": text,
          "User1Id": myUser.ID ,
          "User2Id": user.ID
        }
      }
    })
  }

  useEffect(()=>{
    if(sendMessageCalled && !sendMessageLoading) messagesRefetch()
  }, [sendMessageLoading, sendMessageCalled])

  return (
    <div className='messageCreate'>
      <input type={"text"} value={text} onChange={(e)=>{setText(e.target.value)}} />
      <button onClick={onSendMessage}>send</button>
    </div>
  )
}

