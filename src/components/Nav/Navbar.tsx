import React, { useState } from 'react';
import { useContextProvider } from '../../Provider/ContextProvider';
import { User } from '../../types/User';
import { SearchBar } from '../User/SearchBar';
import { SearchResultPopup } from '../User/SearchResultPopup';


type props={
  users : User[]
  setUsers : React.Dispatch<React.SetStateAction<User[]>>
  showPopup : boolean
  onSearchHandle: (searchString: string) => void
};


export const Navbar:React.FC<props> = ({users, setUsers, showPopup, onSearchHandle}) => {
  const {user} = useContextProvider();
  return (
    <div>
      welcome, {user.FirstName} {user.LastName}
      <SearchBar onSearchHandle={onSearchHandle} />
      {
        showPopup ? (<SearchResultPopup users={users} />) : null
      }
    </div>
  )
}

