import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationCreatePost, mutationRemoveExperience } from '../../../lib/graphql/mutations';
import { querySearch, queryUsersByName } from '../../../lib/graphql/queries';
import { useContextProvider } from '../../../Provider/ContextProvider';
import { Search } from '../../../types/Search';
import { Experience, User } from '../../../types/User';
import { Navbar } from '../../Nav/Navbar';
import { Posts } from '../../posts/Posts';
import Profile from '../Profile';
import { SearchBar } from '../SearchBar';
import { ExperienceUpdate } from './Update';

type props={
  myProfile : boolean
  experience : Experience
};

export const ExperienceItem:React.FC<props> = ({experience, myProfile}) => {

  const {userRefetch} = useContextProvider()

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
    <div>
      <h1> {experience.Position} </h1>
      <h3> {experience.Company} </h3>
      {
        myProfile && (
          <div>
            <button onClick={onRemove}>remove</button>
            <button onClick={()=>{setShowUpdate(true)}}>update</button>
            {
              showUpdate && <ExperienceUpdate experience={experience} setShowUpdate={setShowUpdate} />
            }
          </div>
          )
        }
    </div>
  )
}

