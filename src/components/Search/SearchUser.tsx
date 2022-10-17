import "./style.sass"
import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { UserInfo } from '../../Elements/User/UserInfo';
import { queryCountUser, queryUsersByName } from '../../lib/graphql/queries';
import { TypeUser } from '../../types/TypeUser';
import { ErrorPage } from "../../Elements/Error/ErrorPage";
import { useMiscContext } from "../../Provider/MiscProvider";
import { merge, uniqBy } from "lodash";

type props={
  searchString : string
};

export const SearchUser:React.FC<props> = ({searchString}) => {
  const {setShowLoadingAnimation} = useMiscContext()

  var limit = 5
  const [offset, setOffset] = useState(0)
  const [empty, setEmpty] = useState(false)
  const [users, setUsers] = useState<Array<TypeUser>>([])
  const [loading, setLoading] = useState(false)
  
  const ref = useRef<HTMLDivElement>(null);
  
  const [queryUsersFunc, {loading:usersLoading, error}]= useLazyQuery(queryUsersByName)

  const onLoadMore = (isNew : boolean)=>{
    console.info("load more search usr")
    if(loading || (!isNew && empty)) return
    setLoading(true)
    setShowLoadingAnimation(true)
    console.info("search 1 " + searchString)
    queryUsersFunc({
      variables:{
        "name" : searchString,
        "Limit" : limit,
        "Offset" : isNew ? 0 : offset
      }, 
    }).then((data)=>{
      var newUsers = data.data.UsersByName as TypeUser[]
      if(newUsers.length < limit) setEmpty(true)
      var mergedUsers = isNew ? newUsers : [...users, ...newUsers]
      mergedUsers = uniqBy(mergedUsers, (e)=>{
        return e.ID
      })
      setUsers(mergedUsers)
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
    if(!loading && !usersLoading && !error && ref && (check >= (ref?.current?.offsetHeight as number))){
      onLoadMore(false)
    }
  }

  useEffect(()=>{
    console.info('reloaded page')
    onLoadMore(true)
  }, [])
  
  useEffect(()=>{
    console.info("search string change in search user" + searchString)
    setEmpty(false)
    setOffset(0)
    setUsers([])
    onLoadMore(true)
  }, [searchString])

  return useMemo(()=>(
    <div id="searchUser" ref={ref}>
      {
        !users || !users.length ?
        <ErrorPage text='no user match' /> : 
        (
          <>
          {users.map((user)=>{
            return <UserInfo key={crypto.randomUUID()} user={user} showDetail={true}/>
          })}
          </>
        )
        
      }
    </div>
  ), [users, searchString])
}

