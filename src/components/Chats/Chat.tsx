import './style.sass';

import React, { useEffect, useState } from 'react';
import { BsFillChatSquareTextFill } from 'react-icons/bs';

import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';
import { User } from '../../types/User';
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

  const onChatButtonClick = ()=>{
    if(showList){
      setShowList(false)
      setShowBox(false)
    }else{
      setShowList(true)
    }
  }

  return (
    <div id='chat'>
      <button id='chatButton' onClick={onChatButtonClick}>
        <Icon config={IconSmall} icon={<BsFillChatSquareTextFill />} />
      </button>
      {
        showList && (<ChatList onOpenBox={onOpenBox} />)
      }
      {
        showBox && (<ChatBox user={boxUser as User}/>)
      }
    </div>
  )
}

