import '../post/style.sass';

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { ErrorPage } from '../../Elements/Error/ErrorPage';
import { UserInfo } from '../../Elements/User/UserInfo';
import { TypeSearch } from '../../types/Search';
import { PostItem } from '../post/Item';

type props={
  search : TypeSearch
};

export const Search:React.FC<props> = ({search}) => {

  if(search == undefined || search == null ) return <ErrorPage text='nothing found...' />

  return (
    <div id='search'>
      {
        !search.Users.length ?
        <>no users match</> :
        <div id='searchUser'>
        {
          search.Users.map((user)=>{
            return <UserInfo key={crypto.randomUUID()} user={user} showDetail={true} showConnect={true}/>
          })
        }
        <NavLink className='button3' to={"/SearchUser"} >more user</NavLink> 
        </div>
      }
      {
        !search.Posts.length ?
        <>no post match</> :
        <div id='searchUser'>
        {
          search.Posts.map((post)=>{
            return <PostItem key={crypto.randomUUID()} postId={post.ID} showExtras={false}/>
          })
        }
        <NavLink className='button3' to={"/SearchPost"} >more post</NavLink> 
        </div>
      }
    </div>
  )
}

