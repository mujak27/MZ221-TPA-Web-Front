import '../post/style.sass';

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { ErrorPage } from '../../Elements/Error/ErrorPage';
import { UserInfo } from '../../Elements/User/UserInfo';
import { TypeSearch } from '../../types/TypeSearch';
import { PostItem } from '../post/Item';
import { SearchPost } from './SearchPost';
import { SearchUser } from './SearchUser';

type props={
  search : TypeSearch
  searchString : string
};

enum EnumFilter{
  none,
  user,
  post,
}

export const Search:React.FC<props> = ({search, searchString}) => {
  console.info(search)

  if(search == undefined || search == null ) return <ErrorPage text='nothing found...' />

  const [filter, setFilter] = useState<EnumFilter>(EnumFilter.none)

  return (
    <div id='search'>
      {
        filter != EnumFilter.none && 
          <button className='button3' onClick={()=>setFilter(EnumFilter.none)}>remove filter</button>
      }
      {
        filter != EnumFilter.user && 
          <button className='button2' onClick={()=>setFilter(EnumFilter.user)}>user</button>
      }
      {
        filter != EnumFilter.post && 
          <button className='button2' onClick={()=>setFilter(EnumFilter.post)}>post</button>
      }
      {
        filter == EnumFilter.none && (
          <>
            {
              !search.Users.length ?
              <ErrorPage text='no user match' /> :
              <div id='searchUser'>
                <div id="searchUserList">
                {
                  search.Users.map((user)=>{
                    return <UserInfo key={crypto.randomUUID()} user={user} showDetail={true} showConnect={true}/>
                  })
                }
                </div>
              <NavLink className='button3' to={"/SearchUser"} >more user</NavLink> 
              </div>
            }
            {
              !search.Posts.length ?
              <ErrorPage text='no post match' /> :
              <div id='searchPost'>
              <div id='searchPostList'>
                {
                  search.Posts.map((post)=>{
                    return <PostItem key={crypto.randomUUID()} postId={post.ID} showExtras={false}/>
                  })
                }
              </div>
              <NavLink className='button3' to={"/SearchPost"} >more post</NavLink> 
              </div>
            }
          </>
        )
      }
      {
        filter == EnumFilter.post && (
          <SearchPost searchString={searchString} />
        )
      }
      {
        filter == EnumFilter.user && (
          <SearchUser searchString={searchString} />
        )
      }
    </div>
  )
}

