import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConnectRequests } from './ConnectRequests/ConnectRequests';
import { UserSuggestions } from './UserSuggestions/UserSuggestions';
import "./style.sass"


type props={

};

export const Networks:React.FC<props> = () => {


  return (
    <div id='networks' >
      <ConnectRequests />
      <UserSuggestions />
    </div>
  )
}