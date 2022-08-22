import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationAddExperience, mutationCreatePost, mutationUpdateEducation, mutationUpdateExperience } from '../../../lib/graphql/mutations';
import { querySearch, queryUsersByName } from '../../../lib/graphql/queries';
import { useContextProvider } from '../../../Provider/ContextProvider';
import { Search } from '../../../types/Search';
import { Education, Experience, User } from '../../../types/User';
import { Navbar } from '../../Nav/Navbar';
import { Posts } from '../../posts/Posts';
import { EducationItem } from './Item';
import Profile from '../Profile/Profile';
import { SearchBar } from '../SearchBar';

type props={
  education : Education
  setShowUpdate : (value: React.SetStateAction<boolean>) => void
};

export const EducationUpdate:React.FC<props> = ({education, setShowUpdate}) => {

  const {userRefetch} = useContextProvider()


	const [school, setSchool] = useState(education.School)   
	const [field, setField] = useState(education.Field)
  const [startedAt, setStartedAt] = useState(education.StartedAt)
  const [endedAt, setEndedAt] = useState(education.EndedAt)

  const [updateEducationFUnc, {loading:updateEducationLoading, called : updateEducationCalled}] = useMutation(mutationUpdateEducation)

  const onUpdateEducation = ()=>{
    updateEducationFUnc({
      variables:{
        "id": education.ID,
        "input": {
          "StartedAt": startedAt,
          "EndedAt": endedAt,
          "School": school,
          "Field": field
        }
      }
    })
  }

  useEffect(()=>{
    if(!updateEducationLoading && updateEducationCalled) userRefetch()
  }, [updateEducationLoading, updateEducationCalled])
  
  return (
    <div>
      <button onClick={()=>setShowUpdate(false)}>close</button>
      update Experience
      <div>
        <label>School</label>
        <input type={"text"} value={school} onChange={(e)=>setSchool(e.target.value)} placeholder={"school"} />
      </div>
      <div>
        <label>Field</label>
        <input type={"text"} value={field} onChange={(e)=>setField(e.target.value)} placeholder={"field"} />
      </div>
      <div>
        <label>Started At</label>
        <input type={"date"} value={startedAt} onChange={(e)=>setStartedAt(e.target.value)} placeholder={"started at"} />
      </div>
      <div>
        <label>Ended At</label>
        <input type={"date"} value={endedAt} onChange={(e)=>setEndedAt(e.target.value)} placeholder={"ended at"} />
      </div>
      <button onClick={onUpdateEducation}>update</button>
    </div>
  )
}

