import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { queryUsersByName } from '../../lib/graphql/queries';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { PostItem } from '../posts/PostItem';
import { UserItem } from './UserItem';

type props={
  search : Search | undefined
};

export const SearchResultPopup:React.FC<props> = ({search}) => {
  console.log(search);
  return (
    <div>
      {
        search && search.Users.length && 
        search.Users.map((user)=>{
          return (
            <UserItem user={user} key={crypto.randomUUID()} />
          )
        })
      }
      {
        search && search.Posts.length && 
        search.Posts.map((post)=>{
          return (
            <PostItem post={post} key={crypto.randomUUID()} />
          )
        })
      }
    </div>
  )
}

