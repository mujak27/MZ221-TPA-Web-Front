import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { queryActivities } from '../../lib/graphql/queries';
import { TypeActivity } from '../../types/TypeUser';
import parse from 'html-react-parser'
import { UserInfo } from '../../Elements/User/UserInfo';

type props={
  activity : TypeActivity
};

export const ActivityItem:React.FC<props> = ({activity}) => {


  return (
    <div className='notificationItem'>
      <UserInfo user={activity.User} showDetail={false}/>
      <div className='notificationContent'>
        { parse(activity.Text) }
      </div>
    </div>
  )
}