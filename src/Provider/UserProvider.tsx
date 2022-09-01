import { ApolloQueryResult, useMutation, useQuery } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { NotActive } from '../components/Auth/Activation/NotActive';
import { FillData } from '../components/User/FillData/FillData';
import { queryUser } from '../lib/graphql/queries';

import { User } from '../types/User';
import { strings } from '../utils/strings';
import { parseJwt } from '../utils/token';
import { getUserIdFromLocalStorage } from '../utils/User';
import { useThemeContext } from './ThemeProvider';

type props = {
  children : React.ReactNode | React.ReactNode[]
}

export const guestPath = [
  'login',
  'register',
  'activation',
  'forget',
  'reset',
]

export const checkGuestPath = ()=>{
  if (guestPath.includes((window.location.pathname.split('/')[1]))) return true
  return false
}


type typeContextProvider = {
  user : User,
  userRefetch : (variables?: Partial<{input: any;}> | undefined) => Promise<ApolloQueryResult<any>>
  sessionKey : String,
  doRefresh: () => void,
  logOutHandler : ()=>void,
}
let userContext = createContext<typeContextProvider>({
  user : '' as unknown as User,
  userRefetch : '' as unknown as (variables?: Partial<{input: any;}> | undefined) => Promise<ApolloQueryResult<any>>,
  sessionKey : localStorage.getItem(strings.sessionKey) as string,
  doRefresh: () => {},
  logOutHandler : ()=>{},
})

export const useUserContext = () => useContext(userContext);

export const UserProvider : React.FC<props> = ({children}) => {
  const [refresh, setRefresh] = useState(false);
  const [logOut, setLogout] = useState(false)
  
  const sessionKey = localStorage.getItem(strings.sessionKey) as string;

  const userId = getUserIdFromLocalStorage()
  const {called, loading, data : userData, refetch : userRefetch} = useQuery(queryUser, {
    variables: {
      input: userId
    }
  });
  
  useEffect(()=>{
    console.info("refreshed")
  }, [refresh])
  const doRefresh = ()=>{
    setRefresh(!refresh);
  }
  
  if(!called || loading) return <>checking session...</>
  
  let user = '' as unknown as User;
  if(userData) user = userData.user as User;
  console.info(user)

  const logOutHandler = ()=>{
    console.info('logout handler')
    localStorage.removeItem(strings.sessionKey)
    doRefresh()
  }

  
  const providerWrapper = (children : React.ReactNode | React.ReactNode[]) => {
    return (
      <userContext.Provider value={{
        user, 
        userRefetch,
        sessionKey, 
        doRefresh,
        logOutHandler
      }} >
        {
          children
        }
      </userContext.Provider>
    )
  }

  

  
  if((!sessionKey || !user) && !checkGuestPath()){
    return (
      <Navigate to={'/login'} />
    )
  }

  if(!user.IsActive){
    // return (
    //   <NotActive user={user} />
    // )
    return providerWrapper(<NotActive user={user} />)
  }
  
  if(!user.HasFilledData){
    // return (
    //   <FillData user={user} />
    // )
    return providerWrapper(<FillData user={user} />)
  }

  console.info(user)

  return (
      <userContext.Provider value={{
        user, 
        userRefetch,
        sessionKey, 
        doRefresh,
        logOutHandler
      }} >
        {
          refresh ? (<>{children}</>) : (<>{children}</>)
        }
      </userContext.Provider>
  );
}