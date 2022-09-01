import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserInfo } from '../../../Elements/User/UserInfo';
import { queryConnectRequests } from '../../../lib/graphql/queries';
import { User } from '../../../types/User';
import { concatUserName } from '../../../utils/User';
import Connect from '../../User/Connect';

type props={
  user : User
};

export const UserSuggestionItem:React.FC<props> = ({user}) => {

  return (
    <div className='userSuggestionItem'>
      <UserInfo showDetail={true} user={user} />
      {
        <Connect userId={user.ID} />
      }
    </div>
  )
}