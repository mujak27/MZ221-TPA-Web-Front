import { ApolloQueryResult, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Route, Routes } from 'react-router-dom';
import { mutationCommentPost, mutationLikeComment, mutationSendMessage, mutationUnLikeComment } from '../../../lib/graphql/mutations';
import { queryComments, queryIsLikeComment } from '../../../lib/graphql/queries';
import { useUserContext } from '../../../Provider/UserProvider';
import { Icon } from '../../../styles/Icon/IconContext';
import { IconSmall } from '../../../styles/Icon/IconStyles';
import { TypeComment, TypePost } from '../../../types/TypePost';
import { Comments } from './Comments';


type props={
  comment : TypeComment
  commentRefetch : (variables?: Partial<{
    id: string;
}> | undefined) => Promise<ApolloQueryResult<any>>
};

export const CommentLike:React.FC<props> = ({comment, commentRefetch}) => {

  const {user} = useUserContext()

  const {loading : isLikeCommentLoading, data : isLikeCommentData, refetch : isLikeCommentRefetch} = useQuery(queryIsLikeComment, {
    variables: {
      "id" : comment.ID
    }
  })

  const [likeCommentFunc, {called : likeCommentCalled, loading : likeCommentLoading}] = useMutation(mutationLikeComment)
  
  const [unLikeCommentFunc, {called : unLikeCommentCalled, loading : unLikeCommentLoading}] = useMutation(mutationUnLikeComment)
  
  const onLikeComment = ()=>{
    likeCommentFunc({
      variables:{
        "id" : comment.ID
    }
    })
  }

  const onUnLikeComment = ()=>{
    unLikeCommentFunc({
      variables:{
        "id" : comment.ID
    }
    })
  }
  useEffect(()=>{
    if(!likeCommentLoading && likeCommentCalled) {
      commentRefetch()
      isLikeCommentRefetch()
    }
  }, [likeCommentLoading, likeCommentCalled])
  
  useEffect(()=>{
    if(!unLikeCommentLoading && unLikeCommentCalled)  {
      commentRefetch()
      isLikeCommentRefetch()
    }
  }, [unLikeCommentLoading, unLikeCommentCalled])

  if(isLikeCommentLoading) return <>...</>


  const isLike = isLikeCommentData.IsLikeComment as boolean
  

  return (
    <div className='postLike'>
      {
        isLike ? 
          <button onClick={onUnLikeComment}>
            <Icon config={IconSmall} icon={<FaHeart />} />
          </button> :
          <button onClick={onLikeComment}>
            <Icon config={IconSmall} icon={<FaRegHeart />} />
          </button>
      }{comment.Likes.length}
    </div>
  )
}

