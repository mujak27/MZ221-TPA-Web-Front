import { ApolloQueryResult, useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { mBlock, mUnBlock } from '../../lib/graphql/mutations';
import { qIsBlock } from '../../lib/graphql/queries';


type props={
  userId : string
  userRefetch: (variables?: Partial<{
    link: string;
  }> | undefined) => Promise<ApolloQueryResult<any>>
};

export const Block:React.FC<props> = ({userId, userRefetch}) => {
  
  const {loading : isBlockLoading, data : isBlockData, refetch: isBlockRefetch, error : isBlockError} = useQuery(qIsBlock, {
    variables: {
      userId
    }
  });

  
  const [blockFunc, {loading: blockLoading}] = useMutation(mBlock)
  
  const [unBlockFunc, {loading: unBlockLoading}] = useMutation(mUnBlock)

  const onBlock = ()=>{
    blockFunc({
      variables: {
        userId
      }
    }).then(()=>{
      console.info("done")
      userRefetch()
    })
  }

  const onUnBlock = ()=>{
    unBlockFunc({
      variables: {
        userId
      }
    })
  }

  useEffect(()=>{
    isBlockRefetch();
  }, [blockLoading, unBlockLoading])


  if(isBlockLoading) return (<>loading</>)

  console.info(isBlockData);

  const isBlock = !isBlockError && isBlockData && isBlockData != null ? true : false

  return (
    <button className='button2'
      onClick={isBlock ? onUnBlock : onBlock}
      >
        {isBlock ? <>unblock</> : <>block</>}
  </button>
  )
}

export default Block
