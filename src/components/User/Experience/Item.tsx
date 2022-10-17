import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import { mutationRemoveExperience } from '../../../lib/graphql/mutations';
import { useUserContext } from '../../../Provider/UserProvider';
import { TypeExperience } from '../../../types/TypeUser';
import { ExperienceUpdate } from './Update';

type props={
  myProfile : boolean
  experience : TypeExperience
};

export const ExperienceItem:React.FC<props> = ({experience, myProfile}) => {

  const {userRefetch} = useUserContext()


  const [removeExperienceFunc] = useMutation(mutationRemoveExperience)


  const onRemove = ()=>{
    removeExperienceFunc({
      variables : {
        "id": experience.ID
      }
    }).then(()=>{
      userRefetch()
    })
  }

  return (
    <div className='experienceItem'>
      <h1 className='title1'> {experience.Position} </h1>
      <h3> {experience.Company} </h3>
      {
        myProfile && (
          <div className='flex'> 
            <button className='button3' onClick={onRemove}>remove</button>
            <ExperienceUpdate experience={experience} />
          </div>
          )
        }
    </div>
  )
}

