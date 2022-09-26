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
import { Media } from '../../Elements/Media/Media';
import { PostShare } from './Share/Share';

type props={
  postId : String
  showExtras? : boolean
};

export const PostItem:React.FC<props> = ({postId, showExtras}) => {

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

  if(postData == undefined || postData == null) return null
  const post = postData.Post as Post


  return (
    <div className="postWrapper">
      <div className='postItem' >
        <div className="postItemContent">
          <UserInfo user={post.Sender} />
          <p>
            {parse(post.Text)}
          </p>
        </div>
        {
          showExtras && (
            <>
              <Media attachmentLink={post.AttachmentLink} />
              <div className="postItemBar">
                <PostLike post={post} postRefetch={postRefetch} />
                <div onClick={onCommentButtonClick}>
                  <Icon config={IconSmall} icon={<FaRegCommentDots />} />
                  {post.Comments.length}
                </div>
                <PostShare post={post} />
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

