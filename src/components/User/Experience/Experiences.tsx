import React, { useEffect, useState } from 'react';

import { TypeExperience } from '../../../types/TypeUser';
import { ExperienceCreate } from './Create';
import { ExperienceItem } from './Item';

type props={
  myProfile : boolean
  experiences : TypeExperience[]
};

export const Experiences:React.FC<props> = ({experiences, myProfile}) => {

  const [showCreate, setShowCreate] = useState(false)

  return (
    <div id='experiences'>
      <h1>experiences</h1>
      {
        experiences.map((experience)=>{
          return <ExperienceItem myProfile={myProfile} experience={experience} key={crypto.randomUUID()} />
        })
      }
      {
        myProfile && (<button className='button2' onClick={()=>setShowCreate(true)}>add new experience</button>)
      }
      {
        showCreate && <ExperienceCreate setShowCreate={setShowCreate} />
      }
    </div>
  )
}

