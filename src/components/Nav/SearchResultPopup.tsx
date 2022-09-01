import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Post } from '../../types/Post';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { PostItem } from '../post/Item';
import { UserItem } from '../User/UserItem';

type props={
  search : Search | undefined
  onClosePopup: () => void
};

export const SearchResultPopup:React.FC<props> = ({search, onClosePopup}) => {
  const users = (search as Search).Users as User[]
  const posts = (search as Search).Posts as Post[]
  console.info(users)
  return (
    <div id='searchResultPopup'>
      <h3>users</h3>
      {
        !users.length ? 
          (<>no user found</>)  :
          <>
          {
            users.map((user)=>{
              return (<UserItem user={user} key={crypto.randomUUID()} />)
            })
          }
            <NavLink className={"button1"} to={"/SearchUser"}>more user</NavLink>
          </>
      }
      <h3>posts</h3>
      {
        !posts.length ? 
          (<>no post found</>)  :
          <>
          {
            posts.map((post)=>{
              return (
                <div onClick={onClosePopup}>
                  <PostItem showExtras={false} postId={post.ID} key={crypto.randomUUID()} />
                </div>
              )
            })
          }
            <NavLink className={"button1"} to={"/SearchPost"}>more post</NavLink>
          </>
      }
    </div>
  )
}

