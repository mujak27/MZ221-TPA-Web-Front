import { ApolloQueryResult, useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryComments } from '../../../lib/graphql/queries';
import { TypeComment } from '../../../types/TypePost';
import { CommentCreate } from './Create';
import { Commentitem } from './Item';

type props={
  commentId : string
  postId : string
  depth : number
  parentrefetch: () => void
  addCommentCount : ()=> void
};

export const Comments:React.FC<props> = ({commentId, postId, depth, parentrefetch, addCommentCount}) => {
  
  const limit = 2;
  const [offset, setOffset] = useState(0);
  const [comments, setComments] = useState<TypeComment[]>([])

  const [commentQueryFunc, {loading:commentsLoading, data:commentsData, called:commentsCalled, refetch:commentsRefetch}]= useLazyQuery(queryComments, {
  })
  
  const addComment = (comment : TypeComment)=>{
    setComments([comment, ...comments])
    setOffset(offset+1)
    addCommentCount()
  }

  const onLoadMore =  async ()=>{
    const newOffset = offset + limit;
    commentQueryFunc({
      variables: {
        "CommentId": commentId=="" ? null : commentId,
        "PostId": postId,
        "Limit": limit,
        "Offset": offset
      }
    }).then((data)=>{
      // console.info(data.data.Comments)
      setComments([...comments, ...(data.data.Comments as TypeComment[])])
    })
    setOffset(newOffset)
  }

  useEffect(()=>{
    onLoadMore()
  }, [])

  if(commentsLoading) return <>...</>

  // console.info(comments)
  // const comments = commentsData.Comments as TypeComment[]

  return (
    <div className='comments'>
      <CommentCreate addComment={addComment} parentRefetch={parentrefetch} commentId={commentId} postId={postId} CommentsRefetch={commentsRefetch} />
      {
        comments.map((comment)=>{
          return <Commentitem depth={depth} key={crypto.randomUUID()} commentId={comment.ID}  />
        })
      }
      <button onClick={onLoadMore} className="button3">more</button>
    </div>
  )
}

