import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryPost, queryPosts, queryUsersByName } from '../../lib/graphql/queries';
import { Post } from '../../types/Post';
import { Comments } from './Comment/Comments';
import { CommentCreate } from './Comment/Create';
import { Commentitem } from './Comment/Item';
import { PostLike } from './Like';
import parse from 'html-react-parser'
import { UserProfilePhoto } from '../../Elements/User/UserProfilePhoto';
import { UserInfo } from '../../Elements/User/UserInfo';
import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';
import { FaRegCommentDots } from 'react-icons/fa';
import { PostMedia } from './Media';

type props={
  postId : String
  showExtras : boolean
};

export const PostItem:React.FC<props> = ({postId, showExtras}) => {

  console.info(postId)
  
  const [showComments, setShowComments] = useState(false)

  const {loading:postLoading, data:postData, called:postCalled, refetch:postRefetch}= useQuery(queryPost, {
    variables: {
      "id": postId
    }
  })

  const onCommentButtonClick = ()=>{
    setShowComments(!showComments)
  }

  if(postLoading) return <>...</>

  console.info(postData)

  const post = postData.Post as Post

  return (
    <div className='postItem' >
      <div className="postItemContent">
        <UserInfo showDetail={false} user={post.Sender} />
        {parse(post.Text)}
        {
          showExtras && (
            <>
              <PostMedia attachmentLink={post.AttachmentLink} />
              <div className="postItemBar">
                <PostLike post={post} postRefetch={postRefetch} />
                <div onClick={onCommentButtonClick}>
                  <Icon config={IconSmall} icon={<FaRegCommentDots />} />
                </div>
              </div>
            </>
            )
          }
      </div>
      {
        showComments && ( <Comments commentId='' postId={post.ID} depth={0} /> )
      }
    </div>
  )
}

