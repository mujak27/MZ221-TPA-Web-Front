import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { queryConnectRequests, queryUserSuggestions } from '../../../lib/graphql/queries';
import { User } from '../../../types/User';
import { UserSuggestionItem } from './Item';

type props={

};

export const UserSuggestions:React.FC<props> = () => {

  const {loading : userSuggestionsLoading, data : userSuggestionsData } = useQuery(queryUserSuggestions)

  if(userSuggestionsLoading) return <>fetching data...</>

  const userSuggestions = userSuggestionsData.UsersSuggestion as User[]

  return (
    <div id='userSuggestions'>
      {
        userSuggestions.length ? <>
          <h3>User you might know:</h3>
          {
            userSuggestions.map((connectRequest)=>{
              return <UserSuggestionItem key={crypto.randomUUID()} user={connectRequest} />
            })
          }
        </> : 
        <div id='noUserSuggestion'>
          <h3>no suggestion</h3>
          connect to new people
        </div>
      }
    </div>
  )
}
