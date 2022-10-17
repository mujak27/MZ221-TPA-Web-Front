import './style.sass';

import { useLazyQuery } from '@apollo/client';
import { uniqBy } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { ErrorPage } from '../../Elements/Error/ErrorPage';
import { queryPostsByKeyword } from '../../lib/graphql/queries';
import { useMiscContext } from '../../Provider/MiscProvider';
import { TypePost } from '../../types/TypePost';
import { PostItem } from '../post/Item';

type props={
  searchString : string
};

export const SearchPost:React.FC<props> = ({searchString}) => {
  const {setShowLoadingAnimation} = useMiscContext()

  var limit = 5
  const [offset, setOffset] = useState(0)
  const [empty, setEmpty] = useState(false)
  const [posts, setPosts] = useState<Array<TypePost>>([])
  const [loading, setLoading] = useState(false)


  
  const ref = useRef<HTMLDivElement>(null);
  
  const [queryPostsFunc, {loading:postsLoading, error}]= useLazyQuery(queryPostsByKeyword)

  const onLoadMore = (isNew : boolean)=>{
    console.info("load more search post")
    if(loading || (!isNew && empty)) return
    setLoading(true)
    setShowLoadingAnimation(true)
    console.info("search 1 " + searchString)
    queryPostsFunc({
      variables:{
        "Keyword": searchString,
        "Limit": limit,
        "Offset": isNew ? 0 : offset
      },
    }).then((data)=>{
      console.info(data)
      var newPosts = data.data.PostsByKeyword as TypePost[]
      if(newPosts.length < limit) setEmpty(true)
      var mergedPosts = isNew ? newPosts : [...posts, ...newPosts]
      mergedPosts = uniqBy(mergedPosts, (e)=>{
        return e.ID
      })
      setPosts(mergedPosts)
    })
    setOffset(isNew ? limit : offset+limit )
    setTimeout(()=>{
      setLoading(false)
    }, 500)
    setTimeout(()=>{
      setShowLoadingAnimation(false)
    }, 300)
  }

  window.onscroll = ()=>{
    const check = window.innerHeight + window.scrollY
    if(!loading && !postsLoading && !error && ref && (check >= (ref?.current?.offsetHeight as number))){
      onLoadMore(false)
    }
  }

  useEffect(()=>{
    console.info('reloaded page')
    onLoadMore(true)
  }, [])
  
  useEffect(()=>{
    console.info("search string change in search post " + searchString)
    setEmpty(false)
    setOffset(0)
    setPosts([])
    onLoadMore(true)
  }, [searchString])

  return useMemo(()=>(
    <div id="searchPost" ref={ref}>
      {
        !posts || !posts.length ?
        <ErrorPage text='no post match' /> : 
        (
          <>
          {posts.map((post)=>{
            return <PostItem key={crypto.randomUUID()} postId={post.ID}/>
          })}
          </>
        )
        
      }
    </div>
  ), [posts, searchString])
}

