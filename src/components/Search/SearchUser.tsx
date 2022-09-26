import "./style.sass"
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';

import { UserInfo } from '../../Elements/User/UserInfo';
import { queryCountUser } from '../../lib/graphql/queries';
import { User } from '../../types/User';
import { ErrorPage } from "../../Elements/Error/ErrorPage";

type props={
  users : User[]
  searchString : string
  searchLimit : number
  searchOffset : number
  setSearchOffset: React.Dispatch<React.SetStateAction<number>>
};

export const SearchUser:React.FC<props> = ({users, searchString, searchLimit, searchOffset, setSearchOffset}) => {


  const {data:countUserData, loading:countUserLoading} = useQuery(queryCountUser, {
    variables:{
      "Keyword": searchString
    }
  })

  if(countUserLoading) return <>fetching data...</>
  const countUser = countUserData.CountUser as Number

  const onPrev = ()=>{
    setSearchOffset(searchOffset - searchLimit)
  }

  const onNext = ()=>{
    setSearchOffset(searchOffset + searchLimit)
  }

  return (
    <div id="searchUser">
      {
        !users || !users.length ?
        <ErrorPage text='no user match' /> : 
        (
          <>
          {users.map((user)=>{
            return <UserInfo key={crypto.randomUUID()} user={user} showDetail={true}/>
          })}
          {countUser > searchLimit && (
            <>
              {
                searchOffset > 0  && <button onClick={onPrev}>prev</button> 
              }
              {
                (searchOffset + 1) * searchLimit < countUser && <button onClick={onNext}>next</button>
              }
            </>
          )}
          </>
        )
        
      }
      {
      }
    </div>
  )
}

