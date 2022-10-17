import './style.sass';

import React, { useEffect, useState } from 'react';
import { BsFillChatSquareTextFill } from 'react-icons/bs';

import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';
import { TypeUser } from '../../types/TypeUser';
import { ChatBox } from './Box';
import { ChatList } from './List';
import { useUserContext } from '../../Provider/UserProvider';
import { useMiscContext } from '../../Provider/MiscProvider';

type props={
  boxUser: TypeUser | undefined,
  setBoxUser: React.Dispatch<React.SetStateAction<TypeUser | undefined>>,
  showBox: boolean,
  setShowBox: React.Dispatch<React.SetStateAction<boolean>>,



};

export const Chat:React.FC<props> = ({boxUser,setBoxUser,setShowBox,showBox,}) => {

  const {user} = useUserContext()
  const {setShowPopup} = useMiscContext()

  const [showList, setShowList] = useState(false)

  const onOpenBox = async (user : TypeUser)=>{
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
        showBox && (<ChatBox user={boxUser as TypeUser} setShowBox={setShowBox} />)
      }
    </div>
  )
}

