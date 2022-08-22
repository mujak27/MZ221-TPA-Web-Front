import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { querySearch, queryUsersByName } from '../../lib/graphql/queries';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import { CreatePost } from '../posts/CreatePost';
import { Posts } from '../posts/Posts';
import { Test } from '../test';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../User/SearchBar';

type props={

};

export const Home:React.FC<props> = () => {

  return (
    <div>
      <CreatePost />
      <Posts></Posts>
      {/* <Test /> */}
    </div>
  )
}

