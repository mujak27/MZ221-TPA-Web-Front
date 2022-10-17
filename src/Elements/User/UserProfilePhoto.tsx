import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryPost, queryPosts, queryUsersByName } from '../../lib/graphql/queries';
import { TypePost } from '../../types/TypePost';
import { TypeUser } from '../../types/TypeUser';
import parse from 'html-react-parser'
import { concatUserName, fromUrl, getUserProfilePhoto } from '../../utils/User';
import "./style.sass"

type props={
  user : TypeUser
};

export const UserProfilePhoto:React.FC<props> = ({user}) => {

  return (
    <div 
      className='userProfilePhoto' 
      style={{
        backgroundImage : fromUrl(getUserProfilePhoto(user))
      }}
      >
      <div 
      ></div>
    </div>
  )

}

