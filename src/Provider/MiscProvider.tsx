import { useLazyQuery } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { queryUsersByName } from '../lib/graphql/queries';

type props = {
  children : React.ReactNode | React.ReactNode[]
}

type typeContextProvider = {
  tooltip : JSX.Element
  setTooltip: React.Dispatch<React.SetStateAction<JSX.Element>>
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>,
  popup : JSX.Element
  setPopup: React.Dispatch<React.SetStateAction<JSX.Element>>
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,}

let miscContext = createContext<typeContextProvider>({
  tooltip : <></>,
  setTooltip: '' as unknown as React.Dispatch<React.SetStateAction<JSX.Element>>,
  setShowTooltip: '' as unknown as React.Dispatch<React.SetStateAction<boolean>>,
  popup : <></>,
  setPopup: '' as unknown as React.Dispatch<React.SetStateAction<JSX.Element>>,
  setShowPopup: '' as unknown as React.Dispatch<React.SetStateAction<boolean>>,
})

export const useMiscContext = () => useContext(miscContext);

export const MiscProvider : React.FC<props> = ({children}) => {

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltip, setTooltip] = useState(<></>)
  
  const [showPopup, setShowPopup] = useState(false);
  const [popup, setPopup] = useState(<></>)
  
  useEffect(()=>{

  }, [popup]);

  return (

    <miscContext.Provider value={{
      tooltip,
      setTooltip,
      setShowTooltip,
      popup,
      setPopup,
      setShowPopup,
    }} >
      {
        children
      }
      {
        showTooltip && tooltip
      }
      {
        showPopup && popup
      }

    </miscContext.Provider>
  )
}