import React, { useEffect, useState } from 'react';

import { Education } from '../../../types/User';
import { EducationCreate } from './Create';
import { EducationItem } from './Item';

type props={
  myProfile : boolean
  educations : Education[]
};

export const Educations:React.FC<props> = ({educations, myProfile}) => {

  const [showCreate, setShowCreate] = useState(false)

  return (
    <div id='educations'>
      <h1>educations</h1>
      {
        educations.map((education)=>{
          return <EducationItem myProfile={myProfile} education={education} key={crypto.randomUUID()} />
        })
      }
      {
        myProfile && (<button className='button2' onClick={()=>setShowCreate(true)}>add new education</button>)
      }
      {
        showCreate && <EducationCreate setShowCreate={setShowCreate} />
      }
    </div>
  )
}

