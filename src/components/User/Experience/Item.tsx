import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import { mutationRemoveExperience } from '../../../lib/graphql/mutations';
import { useUserContext } from '../../../Provider/UserProvider';
import { Experience } from '../../../types/User';
import { ExperienceUpdate } from './Update';

type props={
  myProfile : boolean
  experience : Experience
};

export const ExperienceItem:React.FC<props> = ({experience, myProfile}) => {

  const {userRefetch} = useUserContext()

  const [showUpdate, setShowUpdate] = useState(false)

  const [removeExperienceFunc, {loading:removeExperienceLoading, called : removeExperienceCalled}] = useMutation(mutationRemoveExperience)


  const onRemove = ()=>{
    removeExperienceFunc({
      variables : {
        "id": experience.ID
      }
    })
  }

  const onUpdate = ()=>{

  }

  
  useEffect(()=>{
    if(!removeExperienceLoading && removeExperienceCalled) userRefetch()
  }, [removeExperienceLoading, removeExperienceCalled])
  

  return (
    <div className='experienceItem'>
      <h1 className='title1'> {experience.Position} </h1>
      <h3> {experience.Company} </h3>
      {
        myProfile && (
          <div>
            <button className='button3' onClick={onRemove}>remove</button>
            <button className='button3' onClick={()=>{setShowUpdate(true)}}>update</button>
            {
              showUpdate && <ExperienceUpdate experience={experience} setShowUpdate={setShowUpdate} />
            }
          </div>
          )
        }
    </div>
  )
}

