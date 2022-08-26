import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConnectRequests } from './ConnectRequests/ConnectRequests';
import { UserSuggestions } from './UserSuggestions/UserSuggestions';

type props={

};

export const Networks:React.FC<props> = () => {


  return (
    <div>
      <h1>network page</h1>
      <ConnectRequests />
      <UserSuggestions />
    </div>
  )
}