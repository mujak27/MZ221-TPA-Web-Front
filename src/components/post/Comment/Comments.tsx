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
};

export const Comments:React.FC<props> = ({commentId, postId}) => {
  
  const [showComments, setShowComments] = useState(false)

  const {loading:commentsLoading, data:commentsData, called:commentsCalled, refetch:commentsRefetch}= useQuery(queryComments, {
    variables: {
      "CommentId": commentId=="" ? null : commentId,
      "PostId": postId,
    }
  })

  if(commentsLoading) return <>...</>

  const comments = commentsData.Comments as Comment[]

  return (
    <div style={{"border":"1px solid black", "margin":"10px"}}>
      {
        comments.map((comment)=>{
          return <Commentitem key={crypto.randomUUID()} commentId={comment.ID}  />
        })
      }
      <CommentCreate commentId={commentId} postId={postId} CommentsRefetch={commentsRefetch} />
    </div>
  )
}

