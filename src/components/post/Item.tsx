import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryPost, queryPosts, queryUsersByName } from '../../lib/graphql/queries';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../User/SearchBar';
import { Comments } from './Comment/Comments';
import { CommentCreate } from './Comment/Create';
import { Commentitem } from './Comment/Item';
import { PostLike } from './Like';

type props={
  postId : String
};

export const PostItem:React.FC<props> = ({postId}) => {

  console.info(postId)
  
  const [showComments, setShowComments] = useState(false)

  const {loading:postLoading, data:postData, called:postCalled, refetch:postRefetch}= useQuery(queryPost, {
    variables: {
      "id": postId
    }
  })

  if(postLoading) return <>...</>

  const post = postData.Post as Post

  return (
    <div style={{"border":"1px solid black", "margin":"10px"}}>
      {post.Text} - {post.Sender.FirstName} {post.Sender.LastName}
      <PostLike post={post} postRefetch={postRefetch} />

      <Comments commentId='' postId={post.ID} />
      {/* <CommentCreate postId={post.ID} commentId={""} /> */}
    </div>
  )
}

