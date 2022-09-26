import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { UserInfo } from '../../Elements/User/UserInfo';
import { queryUsersByName } from '../../lib/graphql/queries';
import { User } from '../../types/User';


type props={
  // nameRef: React.RefObject<HTMLInputElement>
  onClickHandle : (user: User) => Promise<void>
};

export const UserList:React.FC<props> = ({onClickHandle}) => {

  const userRef = useRef<HTMLInputElement>(null)
  const [queryUsersByNameFunc, {loading}] = useLazyQuery(queryUsersByName)

  const [users, setUsers] = useState<User[]>([])


  
  const onChange = async ()=>{
    queryUsersByNameFunc({
      variables:{
        name : userRef.current?.value,
        Limit : 5,
        Offset : 0,
      }
    }).then((data)=>{
      setUsers(data.data.UsersByName)
    })
  }

  // const users = data.UsersByName as User[]

  return (
    <div>
      <input ref={userRef} type={"text"} placeholder={"name"} onChange={onChange}  />
      <div>
        {
          useMemo(()=>{
            return !loading && !users.length ? 
            <>not found</>: 
            users.map(user=>{
              return <div onClick={()=>onClickHandle(user)}>
                <UserInfo user={user} showDetail={true} isNavigate={false}/>
              </div>
            })
          }, [users])
        }
      </div>
    </div>
  )
}

