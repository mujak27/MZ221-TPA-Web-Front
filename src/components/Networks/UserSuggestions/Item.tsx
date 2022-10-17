import { useEffect, useState } from 'react';

import { UserInfo } from '../../../Elements/User/UserInfo';
import { TypeUser } from '../../../types/TypeUser';
import Connect from '../../User/Connect';

type props={
  user : TypeUser
};

export const UserSuggestionItem:React.FC<props> = ({user}) => {

  return (
    <div className='userSuggestionItem'>
      <UserInfo showDetail={true} user={user} />
      <Connect userId={user.ID} />
    </div>
  )
}