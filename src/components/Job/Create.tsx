import { ApolloQueryResult, OperationVariables, useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationAddJob, mutationCreatePost } from '../../lib/graphql/mutations';

type props={
  jobsRefetch : (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
};

export const JobCreate:React.FC<props> = ({jobsRefetch}) => {

  const [showPopup, setShowPopup] = useState(false);

  const [text, setText] = useState('')

  const [addJobFunc, {loading:addJobLoading, data:addJobData, called : addJobCalled}] = useMutation(mutationAddJob)

  const onSubmitHandle = ()=>{
    addJobFunc({
      variables:{
        "Text" : text
    }
    })
  }

  useEffect(()=>{
    if(!addJobLoading && addJobCalled) {
      jobsRefetch()
    }
  }, [addJobLoading, addJobCalled])
  


  return (
    <div>
      <button
        onClick={()=>setShowPopup(true)}
      > create job
      </button>
        {
          showPopup && (
            <div>
              <button onClick={()=>setShowPopup(false)}>close</button>
              <input type={text} placeholder="text" value={text} onChange={(e)=>setText(e.target.value)} />
              <button onClick={onSubmitHandle}>create new Job</button>
            </div>
          )
        }
    </div>
  )
}

