import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import { Route, Routes } from 'react-router-dom';
import { UserInfo } from '../../../Elements/User/UserInfo';
import { queryComment, queryComments } from '../../../lib/graphql/queries';
import { Icon } from '../../../styles/Icon/IconContext';
import { IconSmall } from '../../../styles/Icon/IconStyles';
import { TypeComment } from '../../../types/TypePost';
import { concatUserName } from '../../../utils/User';
import { Comments } from './Comments';
import { CommentCreate } from './Create';
import { CommentLike } from './Like';
import parse from 'html-react-parser'

type props={
  commentId : string
  depth : number
};

export const Commentitem:React.FC<props> = ({commentId, depth}) => {
  
  const [showComments, setShowComments] = useState(false)
  const [commentCount, setCommentCount] = useState(0)

  const {loading : commentLoading, data : commentData, refetch : commentRefetch} = useQuery(queryComment, {
    variables: {
      "id" : commentId
    },
    onCompleted(data) {
      console.info(data)
      setCommentCount(data.Comment.Replies.length)
    },
  })

  const addCommentCount = ()=>{
    setCommentCount(commentCount + 1)
  }

  if(commentLoading) return <>loading...</>

  const comment = commentData.Comment as TypeComment

  return (
    <div className='commentItem'>
      <div className="commentItemContent">
        <UserInfo user={comment.Sender} />
        {parse(comment.Text)}
        <div className="commentItemBar">
          <CommentLike comment={comment} commentRefetch={commentRefetch} />
          <button onClick={()=>setShowComments(!showComments)}>
            <Icon config={IconSmall} icon={<FaRegCommentDots />} />
            {commentCount}
          </button>
        </div>
      </div>
      {
        showComments && (
          <>
            {
              <Comments addCommentCount={addCommentCount} parentrefetch={commentRefetch} postId={comment.Post.ID} commentId={comment.ID} depth={depth + 1} />
            }
          </>
        )
      }
    </div>
  )
}

