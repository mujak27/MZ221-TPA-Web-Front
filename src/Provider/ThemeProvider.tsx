import './style.sass';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { enumTypeTheme} from '../theme/theme';
import { strings } from '../utils/strings';


type props = {
  children : React.ReactNode | React.ReactNode[]
}


type typeThemeProvider = {
  currTheme : enumTypeTheme,
  setCurrTheme : React.Dispatch<React.SetStateAction<enumTypeTheme>>,
  changeCurrTheme: () => void,
  doRefresh: () => void,
}
let themeContext = createContext<typeThemeProvider>({
  currTheme : enumTypeTheme.light,
  setCurrTheme : '' as unknown as React.Dispatch<React.SetStateAction<enumTypeTheme>>,
  changeCurrTheme: () => {},
  doRefresh: () => {},
})

export const useThemeContext = () => useContext(themeContext);

export const ThemeProvider : React.FC<props> = ({children}) => {

  const localStorageTheme = (()=>{
    if(localStorage.getItem(strings.theme)) return localStorage.getItem(strings.theme) as enumTypeTheme
    return enumTypeTheme.light
  })()
  console.info(localStorageTheme)

  const [refresh, setRefresh] = useState(false);
  const [currTheme, setCurrTheme] = useState<enumTypeTheme>(localStorageTheme);
  
  useEffect(()=>{
    console.info("refreshed")
  }, [refresh])
  const doRefresh = ()=>{
    setRefresh(!refresh);
  }

  
  const changeCurrTheme = ()=>{
    if(currTheme === enumTypeTheme.light){
      setCurrTheme(enumTypeTheme.dark);
    }else{
      setCurrTheme(enumTypeTheme.light);
    }
  }

  useEffect(()=>{
    if(currTheme === enumTypeTheme.light){
      localStorage.setItem(strings.theme, enumTypeTheme.light)
      document.getElementsByTagName("body")[0].style.backgroundColor = "#fff"
    }else{
      localStorage.setItem(strings.theme, enumTypeTheme.dark)
      document.getElementsByTagName("body")[0].style.backgroundColor = "#222"
    }

  }, [currTheme])

  useEffect(()=>{
    console.info('loaded')
  }, [])

  return (
    <div className={currTheme == enumTypeTheme.light ? "lightClass" : "darkClass"}>

      <themeContext.Provider value={{
        currTheme, 
        setCurrTheme, 
        changeCurrTheme,
        doRefresh,
      }} >
        {
          refresh ? (<>{children}</>) : (<>{children}</>)
        }
      </themeContext.Provider>
    </div>
  );
}