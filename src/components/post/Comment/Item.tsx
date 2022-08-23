import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryComment, queryComments } from '../../../lib/graphql/queries';
import { Comment } from '../../../types/Post';
import { concatUserName } from '../../../utils/User';
import { Comments } from './Comments';
import { CommentCreate } from './Create';
import { CommentLike } from './Like';

type props={
  commentId : string
};

export const Commentitem:React.FC<props> = ({commentId}) => {
  
  const [showComments, setShowComments] = useState(false)

  const {loading : commentLoading, data : commentData, refetch : commentRefetch} = useQuery(queryComment, {
    variables: {
      "id" : commentId
    }
  })

  if(commentLoading) return <>loading...</>

  const comment = commentData.Comment as Comment


  return (
    <div>
      {concatUserName(comment.Sender)} : {comment.Text}
      <CommentLike comment={comment} commentRefetch={commentRefetch} />
      <br/>
      {
        !showComments && (
          <button onClick={()=>setShowComments(true)}>show comment</button>
        )
      }
      {
        showComments && (
          <>
            <button onClick={()=>setShowComments(false)}>hide comment</button>
            {comment.Text} <br/>
            {
              <Comments postId={comment.Post.ID} commentId={comment.ID} />
            }
          </>
        )
      }
    </div>
  )
}

