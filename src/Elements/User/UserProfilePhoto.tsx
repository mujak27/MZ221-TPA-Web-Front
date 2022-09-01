import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { queryPost, queryPosts, queryUsersByName } from '../../lib/graphql/queries';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import parse from 'html-react-parser'
import { concatUserName, getUserProfilePhoto } from '../../utils/User';
import "./style.sass"

type props={
  user : User
};

export const UserProfilePhoto:React.FC<props> = ({user}) => {

  return (
    <div className='userProfilePhoto'>
      <img src={getUserProfilePhoto(user)} alt={concatUserName(user)} />
    </div>
  )

}

