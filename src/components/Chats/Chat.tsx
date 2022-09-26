import './style.sass';

import React, { useEffect, useState } from 'react';
import { BsFillChatSquareTextFill } from 'react-icons/bs';

import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';
import { User } from '../../types/User';
import { ChatBox } from './Box';
import { ChatList } from './List';
import { useUserContext } from '../../Provider/UserProvider';
import { useMiscContext } from '../../Provider/MiscProvider';

type props={

};

export const Chat:React.FC<props> = () => {

  const {user} = useUserContext()
  const {setShowPopup} = useMiscContext()

  const [showList, setShowList] = useState(false)
  const [showBox, setShowBox] = useState(false)
  const [boxUser, setBoxUser] = useState<User>()

  const onOpenBox = async (user : User)=>{
    setShowBox(true)
    setBoxUser(user)
    setShowPopup(false)
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
      <div id='chatButtonList'>
        <button id='chatButton' onClick={onChatButtonClick}>
          <h4>chat</h4>
        </button>
        {
          showList && (<ChatList onOpenBox={onOpenBox} />)
        }
      </div>
      {
        showBox && (<ChatBox user={boxUser as User} setShowBox={setShowBox} />)
      }
    </div>
  )
}

