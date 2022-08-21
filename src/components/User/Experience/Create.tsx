import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationAddExperience, mutationCreatePost } from '../../../lib/graphql/mutations';
import { querySearch, queryUsersByName } from '../../../lib/graphql/queries';
import { useContextProvider } from '../../../Provider/ContextProvider';
import { Search } from '../../../types/Search';
import { Experience, User } from '../../../types/User';
import { Navbar } from '../../Nav/Navbar';
import { Posts } from '../../posts/Posts';
import { ExperienceItem } from './Item';
import Profile from '../Profile';
import { SearchBar } from '../SearchBar';

type props={
};

export const ExperienceCreate:React.FC<props> = ({}) => {

  const {userRefetch} = useContextProvider()

  const [position, setPosition] = useState("")
  const [desc, setDesc] = useState("")
  const [company, setCompany] = useState("")
  const [startedAt, setStartedAt] = useState("")
  const [endedAt, setEndedAt] = useState("")
  const [isActive, setIsActive] = useState(false)

  const [addExperienceFunc, {loading:addExperienceLoading, called : addExperienceCalled}] = useMutation(mutationAddExperience)

  const onCreateExperience = ()=>{
    addExperienceFunc({
      variables:{
        "input": {
          "Position": position,
          "Desc": desc,
          "Company" : company,
          "StartedAt": startedAt,
          "EndedAt": endedAt,
          "IsActive": isActive
        }
      }
    })
  }

  useEffect(()=>{
    if(!addExperienceLoading && addExperienceCalled) userRefetch()
  }, [addExperienceLoading, addExperienceCalled])
  
  return (
    <div>
      create new Experience
      <div>
        <label>position</label>
        <input type={"text"} value={position} onChange={(e)=>setPosition(e.target.value)} placeholder={"position"} />
      </div>
      <div>
        <label>company</label>
        <input type={"text"} value={company} onChange={(e)=>setCompany(e.target.value)} placeholder={"company"} />
      </div>
      <div>
        <label>Description</label>
        <input type={"text"} value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder={"description"} />
      </div>
      <div>
        <label>Started At</label>
        <input type={"date"} value={startedAt} onChange={(e)=>setStartedAt(e.target.value)} placeholder={"started at"} />
      </div>
      <div>
        <label>Is this your current active job?</label>
        <input type={"checkbox"} checked={isActive} onChange={(e)=>setIsActive(e.target.checked)} placeholder={"ended at"} />
      </div>
      {
        !isActive && (
        <div>
          <label>Ended At</label>
          <input type={"date"} value={endedAt} onChange={(e)=>setEndedAt(e.target.value)} placeholder={"ended at"} />
        </div>
        )
      }
      <button onClick={onCreateExperience}>submit</button>
    </div>
  )
}

