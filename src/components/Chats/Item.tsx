import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { querySearch, queryUsersByName } from '../../lib/graphql/queries';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import { CreatePost } from '../posts/CreatePost';
import { Posts } from '../posts/Posts';
import Profile from '../User/Profile';
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

