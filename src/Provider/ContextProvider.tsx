import { useMutation, useQuery } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { NotActive } from '../components/Activation/NotActive';
import { queryUser } from '../lib/graphql/query';

import { darkTheme, lightTheme, typeTheme } from '../theme/theme';
import { User } from '../types/User';
import { strings } from '../utils/strings';
import { parseJwt } from '../utils/token';

type props = {
  children : React.ReactNode | React.ReactNode[]
}


type typeContextProvider = {
  user : User,
  sessionKey : String,
  currTheme : typeTheme,
  setCurrTheme : React.Dispatch<React.SetStateAction<typeTheme>>,
  changeCurrTheme: () => void,
  doRefresh: () => void
}
let context = createContext<typeContextProvider>({
  user : '' as unknown as User,
  sessionKey : localStorage.getItem(strings.sessionKey) as string,
  currTheme : lightTheme,
  setCurrTheme : '' as unknown as React.Dispatch<React.SetStateAction<typeTheme>>,
  changeCurrTheme: () => {},
  doRefresh: () => {}
})

export const useContextProvider = () => useContext(context);

export const ContextProvider : React.FC<props> = ({children}) => {
  const [refresh, setRefresh] = useState(false);
  const [currTheme, setCurrTheme] = useState<typeTheme>(lightTheme);
  
  const sessionKey = localStorage.getItem(strings.sessionKey) as string;

  const userId = sessionKey ? parseJwt(sessionKey).userId : "" ;
  const {called, loading, data : userData} = useQuery(queryUser, {
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

  const changeCurrTheme = ()=>{
    if(currTheme === lightTheme){
      setCurrTheme(darkTheme);
    }else{
      setCurrTheme(lightTheme);
    }
  }

  if(!sessionKey){
    return (
      <Navigate to={'/login'} />
    )
  }

  if(!user.IsActive){
    return (
      <NotActive user={user} />
    )
  }

  return (
      <context.Provider value={{
        user, 
        sessionKey, 
        currTheme, 
        setCurrTheme, 
        changeCurrTheme,
        doRefresh
      }} >
        {
          refresh ? (<>{children}</>) : (<>{children}</>)
        }
      </context.Provider>
  );
}