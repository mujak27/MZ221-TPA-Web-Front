import { ApolloQueryResult, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';

import { InputFile } from '../../../Elements/Inputs/file';
import { uploadFile } from '../../../lib/firebase/storage';
import {mutationSendMessage, typeMSendMessage } from '../../../lib/graphql/mutations';
import { useThemeContext } from '../../../Provider/ThemeProvider';
import { useUserContext } from '../../../Provider/UserProvider';
import { Icon } from '../../../styles/Icon/IconContext';
import { IconSmall } from '../../../styles/Icon/IconStyles';
import { enumMessageType } from '../../../types/Message';
import { User } from '../../../types/User';
import { validateMessage } from '../../../utils/validation';

type props={
  user : User
  messagesRefetch : (variables?: Partial<{
    id1: string;
    id2: string;
  }> | undefined) => Promise<ApolloQueryResult<any>>
};

export const MessageCreate:React.FC<props> = ({user, messagesRefetch}) => {

  const {user : myUser} = useUserContext()
  const {currTheme} = useThemeContext()

  const [text, setText] = useState("")
  const [attachment, setAttachment] = useState<File>()

  const [sendMessageFunc] = useMutation(mutationSendMessage)

  const onSendMessage = async ()=>{
    var attachmentUrl = ""
    if(!validateMessage(text, currTheme)) return;
    if(attachment) {
      attachmentUrl = await uploadFile(attachment, user)
    }
    sendMessageFunc({
      variables:{
        "input": {
          text: text,
          user1Id: myUser.ID ,
          user2Id: user.ID,
          imageLink : attachmentUrl,
          messageType : enumMessageType.text
        } as typeMSendMessage
      }
    }).then(()=>{
      messagesRefetch()
    })
  }

  return (
    <div id='messageCreate'>
      <input type={"text"} value={text} onChange={(e)=>{setText(e.target.value)}} />
      <div id="messageCreateMenu">
        <InputFile attachmentFile={attachment} setAttachmentFile={setAttachment} accept=".jpg,.png,.jpeg" />
        <button onClick={onSendMessage} className="button3">
          <Icon config={IconSmall} icon={<FaLocationArrow />} />
        </button>
      </div>
    </div>
  )
}

