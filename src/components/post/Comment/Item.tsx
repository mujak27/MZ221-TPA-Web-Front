import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import { Route, Routes } from 'react-router-dom';
import { UserInfo } from '../../../Elements/User/UserInfo';
import { queryComment, queryComments } from '../../../lib/graphql/queries';
import { Icon } from '../../../styles/Icon/IconContext';
import { IconSmall } from '../../../styles/Icon/IconStyles';
import { Comment } from '../../../types/Post';
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

  const {loading : commentLoading, data : commentData, refetch : commentRefetch} = useQuery(queryComment, {
    variables: {
      "id" : commentId
    }
  })

  if(commentLoading) return <>loading...</>

  const comment = commentData.Comment as Comment


  return (
    <div className='commentItem'>
      <div className="commentItemContent">
        <UserInfo showDetail={true} user={comment.Sender} />
        {parse(comment.Text)}
        <div className="commentItemBar">
          <CommentLike comment={comment} commentRefetch={commentRefetch} />
          <button onClick={()=>setShowComments(!showComments)}>
            <Icon config={IconSmall} icon={<FaRegCommentDots />} />
          </button>
        </div>
      </div>
      {
        showComments && (
          <>
            {
              <Comments postId={comment.Post.ID} commentId={comment.ID} depth={depth + 1} />
            }
          </>
        )
      }
    </div>
  )
}

