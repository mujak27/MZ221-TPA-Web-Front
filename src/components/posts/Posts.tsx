import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryPosts, queryUsersByName } from '../../lib/graphql/queries';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import MyProfile from '../User/MyProfile';
import Profile from '../User/Profile';
import { SearchBar } from '../User/SearchBar';
import { PostItem } from './PostItem';

type props={

};

export const Posts:React.FC<props> = () => {
  var limit = 2
  const [offset, setOffset] = useState(0)
  const [empty, setEmpty] = useState(false)
  const [posts, setPosts] = useState<Array<Post>>([])
  const [postsFunc, {loading:postsLoading, data:postsData, called:postsCalled} ]= useLazyQuery(queryPosts)


  const onLoadMore = ()=>{
    console.info(offset);
    postsFunc({
      variables:{
        "Limit" : limit,
        "Offset" : offset
      }
    })
    setOffset(offset+limit);
  }

  useEffect(()=>{
    onLoadMore()
  }, [])

  useEffect(()=>{
    console.info(postsCalled, postsLoading, postsData)
    if(postsCalled && !postsLoading && postsData && !postsData.Posts.length){
      setEmpty(true);
      return;
    }
    if(!postsLoading && postsData) {
      const newPosts = postsData.Posts as Array<Post>
      setPosts([...posts, ...newPosts])
    }
  }, [postsLoading])

  return (
    <div>
      <div>
        {
          posts.map((post)=>{
            return <PostItem post={post} key={crypto.randomUUID()} />
          })
        }
      </div>
      <button
        onClick={onLoadMore}
        disabled={empty}
        >
          {
            !empty ? <>load more</> : <>that's all</>
          }
        </button>
    </div>
  )
}

