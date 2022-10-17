import './style.sass';

import { NetworkStatus, useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {uniqBy} from 'lodash'
import { queryPosts } from '../../lib/graphql/queries';
import { TypePost } from '../../types/TypePost';
import { PostCreate } from './Create';
import { PostItem } from './Item';
import { useMiscContext } from '../../Provider/MiscProvider';

type props={
};

export const Posts:React.FC<props> = ({}) => {

  const {setShowLoadingAnimation} = useMiscContext()

  var limit = 4
  const [offset, setOffset] = useState(0)
  const [empty, setEmpty] = useState(false)
  const [posts, setPosts] = useState<Array<TypePost>>([])
  const [loading, setLoading] = useState(false)

  const ref = useRef<HTMLDivElement>(null);
  
  const [queryPostsFunc, {loading:postsLoading, error: error}]= useLazyQuery(queryPosts)
  
  const onAddPost = (post : TypePost)=>{
    setPosts([post, ...posts])
    setOffset(offset + 1)
  }

  const onLoadMore = ()=>{
    if(loading || empty) return
    setShowLoadingAnimation(true)
    setLoading(true)
    queryPostsFunc({
      variables:{
        "limit" : limit,
        "offset" : offset
      }, // 1-6
    }).then((data)=>{
      console.info(data)
      var newPosts = data.data.Posts as TypePost[]
      if(newPosts.length < limit) setEmpty(true)
      var mergedPosts = [...posts, ...newPosts]
      mergedPosts = uniqBy(mergedPosts, (e)=>{
        return e.ID
      })
      if(!loading) setPosts(mergedPosts)
    })
    setOffset(offset + limit)
    setTimeout(()=>{
      setLoading(false)
    }, 500)
    setTimeout(()=>{
      setShowLoadingAnimation(false)
    }, 300)
    // setTimeout(()=>{
    //   const check = window.innerHeight + window.scrollY
    //   if(!loading && !postsLoading && !error && ref && (check >= (ref?.current?.offsetHeight as number))){
    //     onLoadMore()
    //   }
    // }, 800)
  }


  window.onscroll = ()=>{
    const check = window.innerHeight + window.scrollY
    if(!loading && !postsLoading && !error && ref && (check >= (ref?.current?.offsetHeight as number))){
      onLoadMore()
    }
  }

  useEffect(()=>{
    onLoadMore()
  }, [])

  return useMemo(()=>(
    <div id="postsWrapper">
      <div id="posts" ref={ref}>
        <PostCreate onAddPost={onAddPost}/>
        {posts.map((post)=>{
          return <PostItem showExtras={true} postId={post.ID} key={crypto.randomUUID()} />
        })}
        <div>
          {/* {
            loading && <div className='loader-element'></div>
          } */}
        </div>
      </div>
    </div>
  ), [posts])
}

