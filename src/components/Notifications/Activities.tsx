import './style.sass';

import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { LoadingPage } from '../../Elements/Loading/Loading';
import { queryActivities } from '../../lib/graphql/queries';
import { TypeActivity } from '../../types/TypeUser';
import { ActivityItem } from './Item';

type props={

};

export const Activities:React.FC<props> = () => {


  const {loading:activitiesLoading, data:activitiesData, called:activitiesCalled, refetch:activitiesRefetch}= useQuery(queryActivities)

  if(activitiesLoading) return <LoadingPage text='loading notifications...' />

  const activities = activitiesData.Activities as TypeActivity[]

  return (
    <div id='notifications'>
      <h1> notifications: </h1>
      {
        !activities.length && <p>no notification here...</p>
      }
      {
        activities.map((activity)=>{
          return <ActivityItem key={crypto.randomUUID()} activity={activity} />
        })
      }
    </div>
  )
}

export default Activities
