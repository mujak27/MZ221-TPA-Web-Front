import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { queryConnectRequests } from '../../../lib/graphql/queries';
import { User } from '../../../types/User';
import { concatUserName } from '../../../utils/User';
import Connect from '../../User/Connect';

type props={
  user : User
};

export const ConnectRequestItem:React.FC<props> = ({user}) => {

  return (
    <div className='connectRequestItem'>
      {
        concatUserName(user)
      }
      {
        <Connect userId={user.ID} />
      }
    </div>
  )
}