import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationCreatePost } from '../../../lib/graphql/mutations';
import { querySearch, queryUsersByName } from '../../../lib/graphql/queries';
import { Search } from '../../../types/Search';
import { Experience, User } from '../../../types/User';
import { Navbar } from '../../Nav/Navbar';
import { Posts } from '../../posts/Posts';
import { ExperienceCreate } from './Create';
import { ExperienceItem } from './Item';
import Profile from '../Profile/Profile';
import { SearchBar } from '../SearchBar';

type props={
  myProfile : boolean
  experiences : Experience[]
};

export const Experiences:React.FC<props> = ({experiences, myProfile}) => {

  const [showCreate, setShowCreate] = useState(false)

  return (
    <div>
      <h1>experiences</h1>
      {
        experiences.map((experience)=>{
          return <ExperienceItem myProfile={myProfile} experience={experience} key={crypto.randomUUID()} />
        })
      }
      {
        myProfile && (<button onClick={()=>setShowCreate(true)}>add new experience</button>)
      }
      {
        showCreate && <ExperienceCreate />
      }
    </div>
  )
}

