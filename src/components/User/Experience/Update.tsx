import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationAddExperience, mutationCreatePost, mutationUpdateExperience } from '../../../lib/graphql/mutations';
import { querySearch, queryUsersByName } from '../../../lib/graphql/queries';
import { useContextProvider } from '../../../Provider/ContextProvider';
import { Search } from '../../../types/Search';
import { Experience, User } from '../../../types/User';
import { Navbar } from '../../Nav/Navbar';
import { Posts } from '../../post/Posts';
import { ExperienceItem } from './Item';
import Profile from '../Profile/Profile';
import { SearchBar } from '../SearchBar';

type props={
  experience : Experience
  setShowUpdate : (value: React.SetStateAction<boolean>) => void
};

export const ExperienceUpdate:React.FC<props> = ({experience, setShowUpdate}) => {

  const {userRefetch} = useContextProvider()

  const [position, setPosition] = useState(experience.Position)
  const [desc, setDesc] = useState(experience.Desc)
  const [company, setCompany] = useState(experience.Company)
  const [startedAt, setStartedAt] = useState(experience.StartedAt)
  const [endedAt, setEndedAt] = useState(experience.EndedAt)
  const [isActive, setIsActive] = useState(experience.IsActive)

  const [mutationUpdateFunc, {loading:mutationUpdateLoading, called : updateExperienceCalled}] = useMutation(mutationUpdateExperience)

  const onUpdateExperience = ()=>{
    mutationUpdateFunc({
      variables:{
        "id": experience.ID,
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
    if(!mutationUpdateLoading && updateExperienceCalled) userRefetch()
  }, [mutationUpdateLoading, updateExperienceCalled])
  
  return (
    <div>
      <button onClick={()=>setShowUpdate(false)}>close</button>
      update Experience
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
      <button onClick={onUpdateExperience}>update</button>
    </div>
  )
}

