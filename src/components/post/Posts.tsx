import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryPosts, queryUsersByName } from '../../lib/graphql/queries';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../Nav/SearchBar';
import { PostItem } from './Item';
import { PostCreate } from './Create';
import "./style.sass"

type props={
};

export const Posts:React.FC<props> = ({}) => {
  var limit = 2
  const [offset, setOffset] = useState(0)
  const [empty, setEmpty] = useState(false)
  const [posts, setPosts] = useState<Array<Post>>([])
  const [postsFunc, {loading:postsLoading, data:postsData, called:postsCalled, refetch:postsRefetch} ]= useLazyQuery(queryPosts)

  const onAddPost = (post : Post)=>{
    setPosts([post, ...posts])
  }

  const onLoadMore = ()=>{
    postsFunc({
      variables:{
        "Limit" : limit,
        "Offset" : offset
      }
    }).then((data)=>{
      const newPosts = data.data.Posts as Array<Post>
      if(newPosts.length) setPosts([...posts, ...newPosts])
      else setEmpty(true)
    })
    setOffset(offset+limit);
  }

  useEffect(()=>{
    onLoadMore()
  }, [])

  return (
    <div id="postsWrapper">
      <div id="posts">
        <PostCreate onAddPost={onAddPost}/>
        <div>
          {
            posts.map((post)=>{
              return <PostItem showExtras={true} postId={post.ID} key={crypto.randomUUID()} />
            })
          }
        </div>
        <button
          onClick={onLoadMore}
          disabled={empty}
          >
            {
              !empty ? 
                <button className='button2'>load more</button> :
                null
                // <button className='button3' disabled>that's all</button>
            }
          </button>
      </div>
    </div>
  )
}
