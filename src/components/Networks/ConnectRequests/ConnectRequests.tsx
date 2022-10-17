import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { queryConnectRequests } from '../../../lib/graphql/queries';
import { TypeConnectionRequest, TypeUser } from '../../../types/TypeUser';
import { ConnectRequestItem } from './item';

type props={

};

export const ConnectRequests:React.FC<props> = () => {

  const {loading : connectRequestsLoading, data : connectRequestsData, refetch : connectRequestRefetch } = useQuery(queryConnectRequests)

  if(connectRequestsLoading) return <>fetching data...</>

  console.info(connectRequestsData)

  const connectRequests = connectRequestsData.ConnectionRequest as TypeConnectionRequest[]

  return (
    <div id='connectRequests'>
      {
        connectRequests.length ?
        <>
          <h1>connect requests:</h1>
          {
            connectRequests.map((connectRequest)=>{
              return <ConnectRequestItem key={crypto.randomUUID()} connectionRequest={connectRequest} />
            })
          }
        </> : <h3 id='noConnectRequest'>no waiting connect request</h3>
      }
    </div>
  )
}