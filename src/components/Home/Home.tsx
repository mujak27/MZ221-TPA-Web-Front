import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { querySearch, queryUsersByName } from '../../lib/graphql/queries';
import { useThemeContext } from '../../Provider/ThemeProvider';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import { PostCreate } from '../post/Create';
import { Posts } from '../post/Posts';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../Nav/SearchBar';
import "./style.sass"
import { toastSuccess } from '../../Elements/Toast/Toast';

import { toast } from 'react-toastify';
import { enumTypeTheme } from '../../theme/theme';

type props={

};

export const Home:React.FC<props> = () => {

  const {currTheme} = useThemeContext()

  return (
    <div id='home'>
      <Posts></Posts>
    </div>
  )
}

