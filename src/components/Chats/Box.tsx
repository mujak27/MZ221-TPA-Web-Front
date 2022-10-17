import { useQuery, useSubscription } from '@apollo/client';
import React, { useEffect, useState, useRef } from 'react';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { FaRegWindowClose } from 'react-icons/fa';
import { UserInfo } from '../../Elements/User/UserInfo';

import { queryMessages } from '../../lib/graphql/queries';
import { subscriptionGetMessages } from '../../lib/graphql/subscriptions';
import { useUserContext } from '../../Provider/UserProvider';
import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';
import { Message } from '../../types/Message';
import { TypeUser } from '../../types/TypeUser';
import { concatUserName } from '../../utils/User';
import { MessageCreate } from './Message/Create';
import { MessageItem } from './Message/Item';
import { VideoCall } from './VideoCall/VideoCall';

type props={
  user : TypeUser
  setShowBox: React.Dispatch<React.SetStateAction<boolean>>
};

export const ChatBox:React.FC<props> = ({user, setShowBox}) => {
  const {user : myUser} = useUserContext()
  const [showVideoCall, setShowVideoCall] = useState(false)
  
  const myRef = useRef<any>()

  // const executeScroll = () => myRef.current!.scrollIntoView() 

  const {loading : messagesLoading, data : messagesData, refetch : messagesRefetch, called} = useQuery(queryMessages, {
    variables: {
      "id1": myUser.ID,
      "id2": user.ID
    }
  })


  if(messagesLoading) return <>fetching data...</>

  const messages = messagesData.Messages as Message[]
  
  return (
    <div id='chatBoxWrapper'>
      <div id='chatBox'>
        <div id="chatBoxHeader">
          <div onClick={()=>{setShowBox(false)}}>
            <Icon config={IconSmall} icon={<FaRegWindowClose />} />
          </div>
          <UserInfo user={user} showDetail showPopup={false} />
          <div id="chatBoxMenu">
            <button onClick={()=>setShowVideoCall(!showVideoCall)}> <Icon  config={IconSmall} icon={<BsFillCameraVideoFill />} /></button>
          </div>
        </div>
        <div id="chatMessages" >
          {
            messages.map((message)=>{
              return <MessageItem key={crypto.randomUUID()} message={message} />
            })
          }
          <div ref={myRef}></div>
        </div>
        <div>

        <MessageCreate user={user} messagesRefetch={messagesRefetch} />
        {
          showVideoCall && <VideoCall user={user} />
        }
        </div>
      </div>
      {/* <VidCallTest /> */}
    </div>
  )
}

