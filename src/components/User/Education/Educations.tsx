import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationCreatePost } from '../../../lib/graphql/mutations';
import { querySearch, queryUsersByName } from '../../../lib/graphql/queries';
import { Search } from '../../../types/Search';
import { Education, Experience, User } from '../../../types/User';
import { Navbar } from '../../Nav/Navbar';
import { Posts } from '../../post/Posts';
import { EducationCreate } from './Create';
import { EducationItem } from './Item';
import Profile from '../Profile/Profile';
import { SearchBar } from '../SearchBar';

type props={
  myProfile : boolean
  educations : Education[]
};

export const Educations:React.FC<props> = ({educations, myProfile}) => {

  const [showCreate, setShowCreate] = useState(false)

  return (
    <div>
      <h1>educations</h1>
      {
        educations.map((education)=>{
          return <EducationItem myProfile={myProfile} education={education} key={crypto.randomUUID()} />
        })
      }
      {
        myProfile && (<button onClick={()=>setShowCreate(true)}>add new education</button>)
      }
      {
        showCreate && <EducationCreate />
      }
    </div>
  )
}

