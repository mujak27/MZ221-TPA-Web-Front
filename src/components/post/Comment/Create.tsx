import { ApolloQueryResult, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationCommentPost, mutationSendMessage } from '../../../lib/graphql/mutations';
import { queryComments } from '../../../lib/graphql/queries';
import { Comment } from '../../../types/Post';
import { Comments } from './Comments';

type props={
  postId : string
  commentId : string
  CommentsRefetch : (variables?: Partial<{
    CommentId: string | null;
    PostId: string;
}> | undefined) => Promise<ApolloQueryResult<any>>
};

export const CommentCreate:React.FC<props> = ({commentId, postId, CommentsRefetch}) => {

  const [text, setText] = useState("")

  const [commentPostFunc, {called : commentPostCalled, loading : commentPostLoading}] = useMutation(mutationCommentPost)


  useEffect(()=>{
    if(!commentPostLoading && commentPostCalled) CommentsRefetch()
  }, [commentPostCalled, commentPostLoading])
  

  const onCreateComment = ()=>{
    commentPostFunc({
      variables: {
        "input": {
          "PostId": postId,
          "RepliedToId": commentId,
          "Text": text,
        }
      }
    })
  }



  return (
    <div>
      Insert comment:
      <input type={text} onChange={(e)=>setText(e.target.value)} />
      <button onClick={onCreateComment}>send</button>
    </div>
  )
}

