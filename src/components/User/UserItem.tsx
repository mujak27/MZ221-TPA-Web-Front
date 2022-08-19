import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { queryUsersByName } from '../../lib/graphql/queries';
import { User } from '../../types/User';

type props={
  user : User
};

export const UserItem:React.FC<props> = ({user}) => {
  return (
    <NavLink to={`/profile/${user.ID}`}>
      <div>
        <h3>{user.FirstName} {user.LastName}</h3>
        <p>{user.Email}</p>
      </div>
    </NavLink>
  )
}

