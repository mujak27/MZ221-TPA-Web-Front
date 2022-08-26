import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { querySearch, queryUsersByName } from '../../lib/graphql/queries';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import { PostCreate } from '../post/Create';
import { Posts } from '../post/Posts';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../User/SearchBar';

type props={
  connectedUser : User
  onOpenBox : (user: User) => void
};

export const ChatItem:React.FC<props> = ({connectedUser, onOpenBox}) => {



  return (
    <div>
      <button onClick={()=>onOpenBox(connectedUser)}>{connectedUser.FirstName} {connectedUser.MidName} {connectedUser.LastName}</button>
    </div>
  )
}

