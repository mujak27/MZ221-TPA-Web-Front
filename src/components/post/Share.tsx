import { ApolloQueryResult, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationLikePost, mutationUnLikePost } from '../../lib/graphql/mutations';
import { queryIsLikePost, queryPosts, queryUsersByName } from '../../lib/graphql/queries';
import { useContextProvider } from '../../Provider/ContextProvider';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../User/SearchBar';

type props={
  post : Post
  postRefetch : (variables?: Partial<{id: String;}> | undefined) => Promise<ApolloQueryResult<any>>
};

export const PostShare:React.FC<props> = ({post, postRefetch}) => {

  const [showShare, setShowShare] = useState(false)

  return (
    <div>
      <button onClick={()=>setShowShare(true)}>share</button>

      {
        showShare && (
          <div>
            
          </div>
        )
      }

      liked by {post.Likes.length}
    </div>
  )
}

