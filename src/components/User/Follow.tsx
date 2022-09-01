import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { mutationFollow, mutationUnFollow } from '../../lib/graphql/mutations';
import { queryIsFollow } from '../../lib/graphql/queries';
import { useUserContext } from '../../Provider/UserProvider';


type props={
  userId : string
};

export const Follow:React.FC<props> = ({userId}) => {

  const {user : myUser} = useUserContext();
  console.info(myUser.ID)

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
    <button className='button2'
      onClick={isFollow ? onUnFollow : onFollow}
      >
        {isFollow ? <>unfollow</> : <>follow</>}
    </button>
  )
}

export default Follow
