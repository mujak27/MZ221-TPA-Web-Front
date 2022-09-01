import { ApolloQueryResult, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Tiptap } from '../../../Elements/Tiptap/TiptapEditor';
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

  const [showCreate, setShowCreate] = useState(false)
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
    <div className='commentCreate'>
      <button onClick={()=>setShowCreate(!showCreate)} >reply</button>
      {showCreate && 
        <div>
          <Tiptap setText={setText} showBar={false} />
          <button onClick={onCreateComment}>send</button>
        </div>
      }
    </div>
  )
}

