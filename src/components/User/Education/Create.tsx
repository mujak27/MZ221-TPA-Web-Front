import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationAddEducation, mutationAddExperience, mutationCreatePost } from '../../../lib/graphql/mutations';
import { querySearch, queryUsersByName } from '../../../lib/graphql/queries';
import { useContextProvider } from '../../../Provider/ContextProvider';
import { Search } from '../../../types/Search';
import { Experience, User } from '../../../types/User';
import { Navbar } from '../../Nav/Navbar';
import { Posts } from '../../posts/Posts';
import { EducationItem } from './Item';
import Profile from '../Profile';
import { SearchBar } from '../SearchBar';

type props={
};

export const EducationCreate:React.FC<props> = ({}) => {

  const {userRefetch} = useContextProvider()


	const [school, setSchool] = useState("")   
	const [field, setField] = useState("")    
	const [startedAt, setStartedAt] = useState("")
	const [endedAt, setEndedAt] = useState("")  

  const [addEducationFunc, {loading:addEducationLoading, called : addEducationCalled}] = useMutation(mutationAddEducation)

  const onAddEducation = ()=>{
    addEducationFunc({
      variables:{
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
    if(!addEducationLoading && addEducationCalled) userRefetch()
  }, [addEducationLoading, addEducationCalled])
  
  return (
    <div>
      create new Education
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
      <button onClick={onAddEducation}>submit</button>
    </div>
  )
}

