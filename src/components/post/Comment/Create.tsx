import { ApolloQueryResult, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import { Tiptap } from '../../../Elements/Tiptap/TiptapEditor';
import { mutationCommentPost } from '../../../lib/graphql/mutations';
import { TypeComment } from '../../../types/TypePost';

type props={
  postId : string
  commentId : string
  addComment : (comment: TypeComment) => void
  CommentsRefetch : (variables?: Partial<{
    CommentId: string | null;
    PostId: string;
}> | undefined) => Promise<ApolloQueryResult<any>>
  parentRefetch: () => void
};

export const CommentCreate:React.FC<props> = ({commentId, postId, addComment, CommentsRefetch, parentRefetch}) => {

  const [showCreate, setShowCreate] = useState(false)
  const [text, setText] = useState("")

  const [commentPostFunc] = useMutation(mutationCommentPost)



  const onCreateComment = ()=>{
    commentPostFunc({
      variables: {
        "input": {
          "PostId": postId,
          "RepliedToId": commentId,
          "Text": text,
        }
      }
    }).then((data)=>{
      // console.info(data.data.CommentPost)
      addComment(data.data.CommentPost)
      // CommentsRefetch()
      // parentRefetch()
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

