import { ApolloQueryResult, useMutation, useQuery } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { queryUser } from '../../lib/graphql/queries';
import { User } from '../../types/User';
import { strings } from '../../utils/strings';
import { parseJwt } from '../../utils/token';
type props = {
  homeToGuest : boolean
}

export const UserMiddleware : React.FC<props> = ({homeToGuest}) => {

  const sessionKey = localStorage.getItem(strings.sessionKey) as string;

  const userId = sessionKey ? parseJwt(sessionKey).userId : "" ;
  const {loading, data : userData} = useQuery(queryUser, {
    variables: {
      input: userId
    }
  });
  

  if(loading) return <>checking token...</>
  
  let user = '' as unknown as User;
  if(userData) user = userData.user as User;
  
  if((!sessionKey || !user ) && homeToGuest){
    return <Navigate to={'/login'} />
  }
  if(sessionKey && user && !homeToGuest){
    return <Navigate to={'/'} />
  }

  return (
    <></>
  );
}