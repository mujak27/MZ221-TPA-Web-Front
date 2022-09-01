import React, { ReactNode } from 'react';
import { IconContext } from 'react-icons';


type props={
  icon : ReactNode,
  config : object
};


export const Icon:React.FC<props> = ({icon, config}) => {


  return (
    <IconContext.Provider value={config}>
      <>{icon}</>
    </IconContext.Provider>
  )

}

