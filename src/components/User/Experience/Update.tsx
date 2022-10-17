import { useMutation } from '@apollo/client';
import React, { createRef, useEffect, useRef, useState } from 'react';

import { Popup } from '../../../Elements/popup/popup';
import { mutationUpdateExperience } from '../../../lib/graphql/mutations';
import { useMiscContext } from '../../../Provider/MiscProvider';
import { useThemeContext } from '../../../Provider/ThemeProvider';
import { useUserContext } from '../../../Provider/UserProvider';
import { TypeExperience } from '../../../types/TypeUser';
import { validateFilled } from '../../../utils/validation';

type props={
  experience : TypeExperience
};

export const ExperienceUpdate:React.FC<props> = ({experience}) => {

  const {userRefetch} = useUserContext()
  const {setShowPopup} = useMiscContext();
  const {currTheme} = useThemeContext();
  
  const position = useRef<HTMLInputElement>(null)
  const company = useRef<HTMLInputElement>(null)
  const desc = useRef<HTMLInputElement>(null)
  const startedAt = useRef<HTMLInputElement>(null)
  const endedAt = useRef<HTMLInputElement>(null)
  const isActive = useRef<HTMLInputElement>(null)
  
  const [mutationUpdateFunc] = useMutation(mutationUpdateExperience)   

  const onUpdateExperience = ()=>{
    if(!validateFilled(position.current?.value as string, "position", currTheme)) return
    if(!validateFilled(company.current?.value as string, "company", currTheme)) return
    mutationUpdateFunc({
      variables:{
        "id": experience.ID,
        "input": {
          "Position": position.current?.value,
          "Desc": desc.current?.value,
          "Company" : desc.current?.value,
          "StartedAt": startedAt.current?.value,
          "IsActive": isActive.current?.value ? true : false,
          "EndedAt": endedAt.current?.value ? endedAt.current?.value  : "",
        }
      }
    }).then(()=>{
      userRefetch();
      setShowPopup(false);
    })
  }
  
  return (
    <div>
      <Popup
      body={<button className='button3'>update</button>}
      popup={

        <>
        <h3> update Experience </h3>
        <div className='gridInput'>

          <label>position</label>
          <input defaultValue={experience.Position} ref={position} type={"text"} placeholder={"position"} />

          <label>company</label>
          <input defaultValue={experience.Company} ref={company} type={"text"} placeholder={"Company"} />

          <label>Description</label>
          <input defaultValue={experience.Desc} ref={desc} type={"text"} placeholder={"desc"} />

          <label>Started At</label>
          <input defaultValue={experience.StartedAt} ref={startedAt} type={"date"} placeholder={"startedAt"} />

          <label>Is this your current active job?</label>
          <input defaultValue={experience.IsActive ? 1 : 0} ref={isActive} type={"checkbox"} placeholder={"isActive"} />
          
          {
            !isActive && (
              <>
                <label>Ended At</label>
                <input defaultValue={experience.EndedAt} ref={endedAt} type={"text"} placeholder={"endedAt"} />
              </>
            
            )
          }
        </div>
        <button onClick={onUpdateExperience} className="button3">update</button>
        </>
      } />
      
    </div>
  )
}

