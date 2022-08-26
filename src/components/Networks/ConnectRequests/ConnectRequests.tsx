import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { queryConnectRequests } from '../../../lib/graphql/queries';
import { User } from '../../../types/User';
import { ConnectRequestItem } from './item';

type props={

};

export const ConnectRequests:React.FC<props> = () => {

  const {loading : connectRequestsLoading, data : connectRequestsData, refetch : connectRequestRefetch } = useQuery(queryConnectRequests)

  if(connectRequestsLoading) return <>fetching data...</>

  const connectRequests = connectRequestsData.ConnectionRequest as User[]
  console.info(connectRequests)

  return (
    <div>
      <h3>connect requests:</h3>
      {
        connectRequests.map((connectRequest)=>{
          return <ConnectRequestItem key={crypto.randomUUID()} user={connectRequest} />
        })
      }
    </div>
  )
}