import { ApolloQueryResult, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationLikePost, mutationUnLikePost } from '../../lib/graphql/mutations';
import { queryIsLikePost, queryPosts, queryUsersByName } from '../../lib/graphql/queries';
import { useUserContext } from '../../Provider/UserProvider';
import { TypePost } from '../../types/TypePost';
import { TypeUser } from '../../types/TypeUser';
import { Navbar } from '../Nav/Navbar';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../Nav/SearchBar';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';

type props={
  post : TypePost
  postRefetch : (variables?: Partial<{id: String;}> | undefined) => Promise<ApolloQueryResult<any>>
};

export const PostLike:React.FC<props> = ({post, postRefetch}) => {

  const {user} = useUserContext()

  const {loading : isLikedLoading, data : isLikedData, refetch : isLikedRefetch} = useQuery(queryIsLikePost, {
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
    if(!likePostLoading && likePostCalled) {
      postRefetch()
      isLikedRefetch()
    }
  }, [likePostLoading, likePostCalled])
  
  useEffect(()=>{
    if(!unLikePostLoading && unLikePostCalled)  {
      postRefetch()
      isLikedRefetch()
    }
  }, [unLikePostLoading, unLikePostCalled])

  if(isLikedLoading) return <>...</>

  const isLike = isLikedData.IsLikePost as boolean
  

  return (
    <div className='postLike'>
      {
        isLike ? 
          <button onClick={onUnLikePost}>
            <Icon config={IconSmall} icon={<FaHeart />} />
          </button> :
          <button onClick={onLikePost}>
            <Icon config={IconSmall} icon={<FaRegHeart />} />
          </button>
      }{post.Likes.length}
    </div>
  )
}

