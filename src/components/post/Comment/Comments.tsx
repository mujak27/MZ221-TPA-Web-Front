import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryComments } from '../../../lib/graphql/queries';
import { Comment } from '../../../types/Post';
import { CommentCreate } from './Create';
import { Commentitem } from './Item';

type props={
  commentId : string
  postId : string
  depth : number
};

export const Comments:React.FC<props> = ({commentId, postId, depth}) => {
  

  const {loading:commentsLoading, data:commentsData, called:commentsCalled, refetch:commentsRefetch}= useQuery(queryComments, {
    variables: {
      "CommentId": commentId=="" ? null : commentId,
      "PostId": postId,
    }
  })

  if(commentsLoading) return <>...</>

  const comments = commentsData.Comments as Comment[]

  return (
    <div className='comments'>
      <CommentCreate commentId={commentId} postId={postId} CommentsRefetch={commentsRefetch} />
      {
        comments.map((comment)=>{
          return <Commentitem depth={depth} key={crypto.randomUUID()} commentId={comment.ID}  />
        })
      }
    </div>
  )
}

