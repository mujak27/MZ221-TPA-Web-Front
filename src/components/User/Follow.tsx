import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { mutationFollow, mutationUnFollow } from '../../lib/graphql/mutations';
import { queryIsFollow, queryUser } from '../../lib/graphql/queries';
import { useContextProvider } from '../../Provider/ContextProvider';
import { User } from '../../types/User';


type props={
  userId : string
};

export const Follow:React.FC<props> = ({userId}) => {

  const {user : myUser} = useContextProvider();

  const {called : isFollowCalled, loading : isFollowLoading, data : isFollowData, refetch: isFollowRefetch} = useQuery(queryIsFollow, {
    variables: {
      id1: myUser.ID,
      id2: userId
    }
  });

  
  const [follow, {called: followCalled, loading: followLoading}] = useMutation(mutationFollow)
  
  const [unFollow, {called: unFollowCalled, loading: unFollowLoading}] = useMutation(mutationUnFollow)

  const onFollow = ()=>{
    follow({
      variables:{
        "id1": myUser.ID,
        "id2": userId
      }
    })
  }

  const onUnFollow = ()=>{
    unFollow({
      variables:{
        "id1": myUser.ID,
        "id2": userId
      }
    })
  }

  useEffect(()=>{
    isFollowRefetch();
  }, [followLoading, unFollowLoading])


  if(isFollowLoading) return (<>fetching user data...</>)

  const isFollow = isFollowData as boolean

  return (
    <button
      onClick={isFollow ? onUnFollow : onFollow}
      >
        {isFollow ? <>unfollow</> : <>follow</>}
    </button>
  )
}

export default Follow
