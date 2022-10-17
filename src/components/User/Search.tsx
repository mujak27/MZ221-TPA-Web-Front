import React, { useEffect, useRef, useState } from 'react';

import { Popup } from '../../Elements/popup/popup';
import { TypeUser } from '../../types/TypeUser';
import { UserList } from './List';


type props={
  body : JSX.Element
  title : string
  onClickHandle : (user: TypeUser) => Promise<void>
};

export const UserSearch:React.FC<props> = ({body, title,onClickHandle}) => {



  return (
    <div>
      <Popup
      body={body}
      popup={
        <div>
          <h3> {title} </h3>
          <UserList onClickHandle={onClickHandle} />
        </div>
      } />
      
    </div>
  )
}

