import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationAddEducation, mutationAddExperience, mutationCreatePost } from '../../../lib/graphql/mutations';
import { querySearch, queryUsersByName } from '../../../lib/graphql/queries';
import { useUserContext } from '../../../Provider/UserProvider';
import { Search } from '../../../types/Search';
import { Experience, User } from '../../../types/User';
import { Navbar } from '../../Nav/Navbar';
import { Posts } from '../../post/Posts';
import { EducationItem } from './Item';
import Profile from '../Profile/Profile';
import { SearchBar } from '../../Nav/SearchBar';
import { Icon } from '../../../styles/Icon/IconContext';
import { IconSmall } from '../../../styles/Icon/IconStyles';
import { FaWindowClose } from 'react-icons/fa';

type props={
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>
};

export const EducationCreate:React.FC<props> = ({setShowCreate}) => {

  const {userRefetch} = useUserContext()


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
    
    <div className='fixedPopup'>
      <div className="popupHead">
        <button onClick={()=>{setShowCreate(false)}}>
          <Icon config={IconSmall} icon={<FaWindowClose />} />
        </button>
        <h1 className='title1'> create new Education </h1>
      </div>
      <div className='gridInput'>
        <label>School</label>
        <input type={"text"} value={school} onChange={(e)=>setSchool(e.target.value)} placeholder={"school"} />
        <label>Field</label>
        <input type={"text"} value={field} onChange={(e)=>setField(e.target.value)} placeholder={"field"} />
        <label>Started At</label>
        <input type={"date"} value={startedAt} onChange={(e)=>setStartedAt(e.target.value)} placeholder={"started at"} />
        <label>Ended At</label>
        <input type={"date"} value={endedAt} onChange={(e)=>setEndedAt(e.target.value)} placeholder={"ended at"} />
      </div>
      <button className='button2' onClick={onAddEducation}>submit</button>
    </div>
  )
}

