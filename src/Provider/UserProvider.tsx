import { ApolloQueryResult, useQuery } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { NotActive } from '../components/Auth/Activation/NotActive';
import { FillData } from '../components/User/FillData/FillData';
import { queryUser } from '../lib/graphql/queries';
import { User } from '../types/User';
import { strings } from '../utils/strings';
import { getUserIdFromLocalStorage } from '../utils/User';

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
  const sessionKey = localStorage.getItem(strings.sessionKey) as string;
  const userId = getUserIdFromLocalStorage()
  
  const [refresh, setRefresh] = useState(false);

  
  const [user, setUser] = useState<User>({
    ID: "",
    Email: "",
    FirstName : "",
    MidName : "",
    LastName : "",
    IsActive : false,
    ProfilePhoto : "",
    BackgroundPhoto : "",
    Headline : "",
    Pronoun : "",
    ProfileLink : "",
    About : "",
    Location : "",
    IsSso : false,
    HasFilledData : false,
    Password : "",
    Educations : [],
    Experiences : [],
    Follows : [],
    Visits : [],
  })


  const {loading, data : userData, refetch : userRefetch, } = useQuery(queryUser, {
    variables: {
      input: userId
    },
    onCompleted(data) {
      setUser({
        ID: data.user.ID,
        Email: data.user.Email,
        FirstName : data.user.FirstName,    
        MidName : data.user.MidName,
        LastName : data.user.LastName,
        IsActive : data.user.IsActive,
        ProfilePhoto : data.user.ProfilePhoto,
        BackgroundPhoto : data.user.BackgroundPhoto,
        Headline : data.user.Headline,
        Pronoun : data.user.Pronoun,
        ProfileLink : data.user.ProfileLink,
        About : data.user.About,
        Location : data.user.Location,
        IsSso : data.user.IsSso,
        HasFilledData : data.user.HasFilledData,
        Password : data.user.Password,
        Educations : data.user.Educations,
        Experiences : data.user.Experiences,
        Follows : data.user.Follows,
        Visits : data.user.Visits,
      })
    },
  })
  
  
  useEffect(()=>{
    console.info("refreshed")
  }, [refresh])
  const doRefresh = ()=>{
    setRefresh(!refresh);
  }

  const logOutHandler = ()=>{
    localStorage.removeItem(strings.sessionKey)
    doRefresh()
  }
  
  if(loading) return <>checking session...</>

  const providerWrapper = (children : React.ReactNode | React.ReactNode[]) => {
    return (
      <userContext.Provider value={{
        user : userData ? userData.user as User : '' as unknown as User, 
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
    localStorage.removeItem(strings.sessionKey)
    return (
      <Navigate to={'/login'} />
    )
  }

  if(!user.IsActive){
    return providerWrapper(<NotActive user={user} />)
  }
  
  if(!user.HasFilledData){
    return providerWrapper(<FillData user={user} />)
  }

  console.info(user)

  return providerWrapper(refresh ? (<>{children}</>) : (<>{children}</>))
}