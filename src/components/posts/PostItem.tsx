import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryPosts, queryUsersByName } from '../../lib/graphql/queries';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import Profile from '../User/Profile';
import { SearchBar } from '../User/SearchBar';

type props={
  post : Post
};

export const PostItem:React.FC<props> = ({post}) => {

  return (
    <div>
      {post.Text} - {post.Sender.FirstName} {post.Sender.LastName}
    </div>
  )
}

