import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { queryUsersByName } from '../../lib/graphql/queries';
import { Post } from '../../types/Post';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { PostItem } from '../post/Item';
import { UserItem } from './UserItem';

type props={
  search : Search | undefined
};

export const SearchResultPopup:React.FC<props> = ({search}) => {
  console.log(search);
  const users = (search as Search).Users as User[]
  const posts = (search as Search).Posts as Post[]
  return (
    <div>
      {
        users.map((user)=>{
          return (
            <UserItem user={user} key={crypto.randomUUID()} />
          )
        })
      }
      {
        posts.map((post)=>{
          return (
            <PostItem postId={post.ID} key={crypto.randomUUID()} />
          )
        })
      }
    </div>
  )
}

