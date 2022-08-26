import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { queryActivities } from '../../lib/graphql/queries';
import { Activity } from '../../types/User';
import { ActivityItem } from './Item';

type props={

};

export const Activities:React.FC<props> = () => {


  const {loading:activitiesLoading, data:activitiesData, called:activitiesCalled, refetch:activitiesRefetch}= useQuery(queryActivities)

  if(activitiesLoading) return <>...</>

  const activities = activitiesData.Activities as Activity[]

  return (
    <div style={{"border":"1px solid black", "margin":"10px"}}>
      notifications:
      {
        activities.map((activity)=>{
          return <ActivityItem key={crypto.randomUUID()} activity={activity} />
        })
      }
    </div>
  )
}

export default Activities
