import { useQuery } from '@apollo/client';
import React, { useState } from 'react';

import { UserInfo } from '../../Elements/User/UserInfo';
import { queryCountUser } from '../../lib/graphql/queries';
import { Search } from '../../types/Search';
import { User } from '../../types/User';

type props={
  users : User[]
  setSearch : React.Dispatch<React.SetStateAction<Search | undefined>>
  searchString : string
  searchOffset : number
  setSearchOffset: React.Dispatch<React.SetStateAction<number>>
  searchLimit : number
  setSearchLimit: React.Dispatch<React.SetStateAction<number>>
};

export const SearchUser:React.FC<props> = ({users, setSearch, searchString, searchLimit, searchOffset, setSearchLimit, setSearchOffset}) => {


  const {data:countUserData, loading:countUserLoading} = useQuery(queryCountUser, {
    variables:{
      "Keyword": searchString
    }
  })

  if(countUserLoading) return <>fetching data...</>
  const countUser = countUserData.CountUser as Number
  console.info(countUser)

  const onPrev = ()=>{
    setSearchOffset(searchOffset - searchLimit)
  }

  const onNext = ()=>{
    setSearchOffset(searchOffset + searchLimit)
  }

  return (
    <div>
      {
        !users || !users.length ?
        <>no user match</> :
        users.map((user)=>{
          return <UserInfo key={crypto.randomUUID()} user={user} showDetail={true}/>
        })
      }
      {
        users && users.length && countUser > searchLimit && (
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

