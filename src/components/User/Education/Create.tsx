import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';

import { mutationAddEducation } from '../../../lib/graphql/mutations';
import { useThemeContext } from '../../../Provider/ThemeProvider';
import { useUserContext } from '../../../Provider/UserProvider';
import { Icon } from '../../../styles/Icon/IconContext';
import { IconSmall } from '../../../styles/Icon/IconStyles';
import { validateFilled } from '../../../utils/validation';

type props={
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>
};

export const EducationCreate:React.FC<props> = ({setShowCreate}) => {

  const {userRefetch} = useUserContext()
  const {currTheme} = useThemeContext()


	const [school, setSchool] = useState("")   
	const [field, setField] = useState("")    
	const [startedAt, setStartedAt] = useState("")
	const [endedAt, setEndedAt] = useState("")  

  const [addEducationFunc] = useMutation(mutationAddEducation)

  const onAddEducation = ()=>{
    if(!validateFilled(school, "school", currTheme)) return
    if(!validateFilled(field, "field", currTheme)) return
    addEducationFunc({
      variables:{
        "input": {
          "StartedAt": startedAt,
          "EndedAt": endedAt,
          "School": school,
          "Field": field
        }
      }
    }).then(()=>{
      userRefetch()
      setShowCreate(false)
    })
  }
  
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

