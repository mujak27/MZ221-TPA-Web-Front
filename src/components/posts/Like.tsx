import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationLikePost, mutationUnLikePost } from '../../lib/graphql/mutations';
import { queryIsLiked, queryPosts, queryUsersByName } from '../../lib/graphql/queries';
import { useContextProvider } from '../../Provider/ContextProvider';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../User/SearchBar';

type props={
  post : Post
};

export const PostLike:React.FC<props> = ({post}) => {

  const {user} = useContextProvider()

  const {loading : isLikedLoading, data : isLikedData, refetch : isLikedRefetch} = useQuery(queryIsLiked, {
    variables: {
      "id" : post.ID
  }
  })

  const [likePostFunc, {called : likePostCalled, loading : likePostLoading}] = useMutation(mutationLikePost)
  
  const [unLikePostFunc, {called : unLikePostCalled, loading : unLikePostLoading}] = useMutation(mutationUnLikePost)
  
  const onLikePost = ()=>{
    likePostFunc({
      variables:{
        "id" : post.ID
    }
    })
  }

  const onUnLikePost = ()=>{
    unLikePostFunc({
      variables:{
        "id" : post.ID
    }
    })
  }
  useEffect(()=>{
    if(!likePostLoading && likePostCalled) isLikedRefetch()
  }, [likePostLoading, likePostCalled])
  
  useEffect(()=>{
    if(!unLikePostLoading && unLikePostCalled) isLikedRefetch()
  }, [unLikePostLoading, unLikePostCalled])

  if(isLikedLoading) return <>...</>

  const isLike = isLikedData.IsLiked as boolean

  

  return (
    <div>
      {
        isLike ? 
          <button onClick={onUnLikePost}>unlike</button> :
          <button onClick={onLikePost}>like</button>
      }
    </div>
  )
}

