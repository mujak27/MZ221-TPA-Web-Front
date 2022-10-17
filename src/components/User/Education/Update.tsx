import { useMutation } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { Popup } from '../../../Elements/popup/popup';

import { mutationUpdateEducation } from '../../../lib/graphql/mutations';
import { useMiscContext } from '../../../Provider/MiscProvider';
import { useThemeContext } from '../../../Provider/ThemeProvider';
import { useUserContext } from '../../../Provider/UserProvider';
import { TypeEducation } from '../../../types/TypeUser';
import { validateFilled } from '../../../utils/validation';

type props={
  education : TypeEducation
};

export const EducationUpdate:React.FC<props> = ({education}) => {

  const {userRefetch} = useUserContext()
  const {setShowPopup} = useMiscContext()
  const {currTheme} = useThemeContext()


	const school = useRef<HTMLInputElement>(null)
	const field = useRef<HTMLInputElement>(null)
  const startedAt = useRef<HTMLInputElement>(null)
  const endedAt = useRef<HTMLInputElement>(null)

  const [updateEducationFUnc, {loading:updateEducationLoading, called : updateEducationCalled}] = useMutation(mutationUpdateEducation)

  const onUpdateEducation = ()=>{
    if(!validateFilled(school.current?.value as string, "school", currTheme)) return
    if(!validateFilled(field.current?.value as string, "field", currTheme)) return
    updateEducationFUnc({
      variables:{
        "id": education.ID,
        "input": {
          "School": school.current?.value,
          "Field": field.current?.value,
          "StartedAt": startedAt.current?.value,
          "EndedAt": endedAt.current?.value,
        }
      }
    }).then(()=>{
      userRefetch()
      setShowPopup(false)
    })
  }

  
  return (
    <div>
      <Popup
      body={<button className='button3'>update</button>}
      popup={
        <div>
          <h3> update Experience </h3>
          <div className='gridInput'>
            <label>School</label>
            <input type={"text"} defaultValue={education.School} ref={school} placeholder={"school"} />
            
            <label>Field</label>
            <input type={"text"} defaultValue={education.Field} ref={field}  placeholder={"field"} />
            
            <label>Started At</label>
            <input type={"date"} defaultValue={education.StartedAt} ref={startedAt} placeholder={"started at"} />
            
            <label>Ended At</label>
            <input type={"date"} defaultValue={education.EndedAt} ref={endedAt} placeholder={"ended at"} />
            
          </div>
          <button className='button3' onClick={onUpdateEducation}>update</button>
        </div>
      } />
      </div>
  )
}

