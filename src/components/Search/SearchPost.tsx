import { useQuery } from '@apollo/client';
import React, { useState } from 'react';

import { queryCountPost, queryCountUser } from '../../lib/graphql/queries';
import { Post } from '../../types/Post';
import { TypeSearch } from '../../types/Search';
import { PostItem } from '../post/Item';
import "../post/style.sass"

type props={
  posts : Post[]
  setSearch : React.Dispatch<React.SetStateAction<TypeSearch | undefined>>
  searchString : string
  searchOffset : number
  setSearchOffset: React.Dispatch<React.SetStateAction<number>>
  searchLimit : number
  setSearchLimit: React.Dispatch<React.SetStateAction<number>>
};

export const SearchPost:React.FC<props> = ({posts, setSearch, searchString, searchLimit, searchOffset, setSearchLimit, setSearchOffset}) => {


  const {data:countPostData, loading:countPostLoading} = useQuery(queryCountPost, {
    variables:{
      "Keyword": searchString
    }
  })

  if(countPostLoading) return <>fetching data...</>
  const countUser = countPostData.CountUser as Number

  const onPrev = ()=>{
    setSearchOffset(searchOffset - searchLimit)
  }

  const onNext = ()=>{
    setSearchOffset(searchOffset + searchLimit)
  }

  return (
    <div>
      {
        !posts || !posts.length ?
        <>no user match</> :
        posts.map((post)=>{
          return <PostItem key={crypto.randomUUID()} postId={post.ID} showExtras={true}/>
        })
      }
      {
        posts && posts.length && countUser > searchLimit && (
          <>
            {
              searchOffset > 0  && <button onClick={onPrev}>prev</button> 
            }
            {
              (searchOffset + 1) * searchLimit < countUser && <button onClick={onNext}>next</button>
            }
          </>
        )
      }
    </div>
  )
}

