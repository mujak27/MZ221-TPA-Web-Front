import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { queryActivities } from '../../lib/graphql/queries';
import { Activity } from '../../types/User';

type props={
  activity : Activity
};

export const ActivityItem:React.FC<props> = ({activity}) => {


  return (
    <div style={{"border":"1px solid black", "margin":"10px"}}>
      {
        activity.Text
      }
    </div>
  )
}