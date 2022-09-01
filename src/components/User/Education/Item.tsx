import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationCreatePost, mutationRemoveEducation, mutationRemoveExperience } from '../../../lib/graphql/mutations';
import { querySearch, queryUsersByName } from '../../../lib/graphql/queries';
import { useUserContext } from '../../../Provider/UserProvider';
import { Search } from '../../../types/Search';
import { Education, Experience, User } from '../../../types/User';
import { Navbar } from '../../Nav/Navbar';
import { Posts } from '../../post/Posts';
import Profile from '../Profile/Profile';
import { SearchBar } from '../../Nav/SearchBar';
import { EducationUpdate } from './Update';

type props={
  myProfile : boolean
  education : Education
};

export const EducationItem:React.FC<props> = ({education, myProfile}) => {

  const {userRefetch} = useUserContext()

  const [showUpdate, setShowUpdate] = useState(false)

  const [removeEducationFunc, {loading:removeEducationLoading, called : removeEducationCalled}] = useMutation(mutationRemoveEducation)


  const onRemove = ()=>{
    removeEducationFunc({
      variables : {
        "id": education.ID
      }
    })
  }

  const onUpdate = ()=>{

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
          <div>
            <button className='button3' onClick={onRemove}>remove</button>
            <button className='button3' onClick={()=>{setShowUpdate(true)}}>update</button>
            {
              showUpdate && <EducationUpdate education={education} setShowUpdate={setShowUpdate} />
            }
          </div>
          )
        }
    </div>
  )
}

