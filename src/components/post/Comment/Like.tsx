import { ApolloQueryResult, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationCommentPost, mutationLikeComment, mutationSendMessage, mutationUnLikeComment } from '../../../lib/graphql/mutations';
import { queryComments, queryIsLikeComment } from '../../../lib/graphql/queries';
import { useContextProvider } from '../../../Provider/ContextProvider';
import { Comment, Post } from '../../../types/Post';
import { Comments } from './Comments';


type props={
  comment : Comment
  commentRefetch : (variables?: Partial<{
    id: string;
}> | undefined) => Promise<ApolloQueryResult<any>>
};

export const CommentLike:React.FC<props> = ({comment, commentRefetch}) => {

  const {user} = useContextProvider()

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
  
  console.info(isLikeCommentData)
  

  return (
    <div>
      {
        isLike ? 
          <button onClick={onUnLikeComment}>unlike</button> :
          <button onClick={onLikeComment}>like</button>
      }
      liked by {comment.Likes.length}
    </div>
  )
}

