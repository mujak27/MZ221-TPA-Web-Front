import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import { mutationRemoveEducation } from '../../../lib/graphql/mutations';
import { useUserContext } from '../../../Provider/UserProvider';
import { Education } from '../../../types/User';
import { EducationUpdate } from './Update';

type props={
  myProfile : boolean
  education : Education
};

export const EducationItem:React.FC<props> = ({education, myProfile}) => {

  const {userRefetch} = useUserContext()

  const [removeEducationFunc, {loading:removeEducationLoading, called : removeEducationCalled}] = useMutation(mutationRemoveEducation)


  const onRemove = ()=>{
    removeEducationFunc({
      variables : {
        "id": education.ID
      }
    })
  }
  
  useEffect(()=>{
    if(!removeEducationLoading && removeEducationCalled) userRefetch()
  }, [removeEducationLoading, removeEducationCalled])
  

  return (
    <div className='educationItem'>
      <h1 className='title1'> {education.School} </h1>
      <h3> {education.Field} </h3>
      {
        myProfile && (
          <div className='flex'>
            <button className='button3' onClick={onRemove}>remove</button>
            <EducationUpdate education={education} />
          </div>
          )
        }
    </div>
  )
}

