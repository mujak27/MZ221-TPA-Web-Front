import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';

import { mutationAddExperience } from '../../../lib/graphql/mutations';
import { useUserContext } from '../../../Provider/UserProvider';
import { Icon } from '../../../styles/Icon/IconContext';
import { IconSmall } from '../../../styles/Icon/IconStyles';

type props={
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>
};

export const ExperienceCreate:React.FC<props> = ({setShowCreate}) => {

  const {userRefetch} = useUserContext()

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
    <div className='fixedPopup'>
      <div className="popupHead">
        <button onClick={()=>{setShowCreate(false)}}>
          <Icon config={IconSmall} icon={<FaWindowClose />} />
        </button>
        <h1 className='title1'> create new Experience </h1>
      </div>
      <div className='gridInput'>
        <label>position</label>
        <input type={"text"} value={position} onChange={(e)=>setPosition(e.target.value)} placeholder={"position"} />
        <label>company</label>
        <input type={"text"} value={company} onChange={(e)=>setCompany(e.target.value)} placeholder={"company"} />
        <label>Description</label>
        <input type={"text"} value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder={"description"} />
        <label>Started At</label>
        <input type={"date"} value={startedAt} onChange={(e)=>setStartedAt(e.target.value)} placeholder={"started at"} />
        <label>active</label>
        <input type={"checkbox"} checked={isActive} onChange={(e)=>setIsActive(e.target.checked)} placeholder={"ended at"} />
        {
          !isActive && (
            <>
            <label>Ended At</label>
            <input type={"date"} value={endedAt} onChange={(e)=>setEndedAt(e.target.value)} placeholder={"ended at"} />
          </>
          )
        }
      </div>
      <button className='button2' onClick={onCreateExperience}>submit</button>
    </div>
  )
}

