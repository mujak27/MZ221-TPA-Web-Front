import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { queryUsersByName } from '../../lib/graphql/queries';
import { User } from '../../types/User';
import { UserItem } from './UserItem';

type props={
  users : User[]
  
};

export const SearchResultPopup:React.FC<props> = ({users}) => {
  console.log(users);
  return (
    <div>
      {
        users.length? 
        users.map((user)=>{
          return (
            <UserItem user={user} key={crypto.randomUUID()} />
          )
        })
        : <>nothing matches</>
      }
    </div>
  )
}

