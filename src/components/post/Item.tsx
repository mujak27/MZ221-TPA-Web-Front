import { useQuery } from '@apollo/client';
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';

import { Media } from '../../Elements/Media/Media';
import { UserInfo } from '../../Elements/User/UserInfo';
import { queryPost } from '../../lib/graphql/queries';
import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';
import { TypePost } from '../../types/TypePost';
import { Comments } from './Comment/Comments';
import { PostLike } from './Like';
import { PostShare } from './Share/Share';

type props={
  postId : String
  showExtras? : boolean
};

export const PostItem:React.FC<props> = ({postId, showExtras}) => {

  const [showComments, setShowComments] = useState(false)
  const [commentCount, setCommentCount] = useState(0)

  const {loading:postLoading, data:postData, called:postCalled, refetch:postRefetch}= useQuery(queryPost, {
    variables: {
      "id": postId
    },
    onCompleted(data) {
      // console.info(data)
      setCommentCount(data.Post.Comments.length)
    },
  })

  const addCommentCount = ()=>{
    setCommentCount(commentCount + 1)
  }

  const onCommentButtonClick = ()=>{
    setShowComments(!showComments)
  }

  const parentRefetch = ()=>{
    postRefetch({
      id: postId
    })
  }

  if(postLoading) return <>...</>

  if(postData == undefined || postData == null) return null
  const post = postData.Post as TypePost

  return (
    <div className="postWrapper">
      <div className='postItem' >
        <div className="postItemContent">
          <UserInfo user={post.Sender} showPopup={true}/>
          {parse(post.Text)}
        </div>
        {
          showExtras && (
            <>
              <Media attachmentLink={post.AttachmentLink} />
              <div className="postItemBar">
                <PostLike post={post} postRefetch={postRefetch} />
                <div onClick={onCommentButtonClick}>
                  <Icon config={IconSmall} icon={<FaRegCommentDots />} />
                  {commentCount}
                </div>
                <PostShare post={post} />
              </div>
            </>
          )
        }
      </div>
      {
        showComments && ( <Comments addCommentCount={addCommentCount} parentrefetch={parentRefetch} commentId='' postId={post.ID} depth={0} /> )
      }
    </div>
  )
}

