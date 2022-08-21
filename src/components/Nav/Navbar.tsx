import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useContextProvider } from '../../Provider/ContextProvider';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { SearchBar } from '../User/SearchBar';
import { SearchResultPopup } from '../User/SearchResultPopup';


type props={
  search : Search | undefined
  setSearch : React.Dispatch<React.SetStateAction<Search | undefined>>
  showPopup : boolean
  onSearchHandle: (searchString: string) => void
};


export const Navbar:React.FC<props> = ({search, setSearch, showPopup, onSearchHandle}) => {
  const {user} = useContextProvider();
  return (
    <div>
      <NavLink to={"/profile/" + user.ID}>
        <>welcome, {user.FirstName} {user.LastName}</>
      </NavLink>
      <SearchBar onSearchHandle={onSearchHandle} />
      {
        showPopup ? (<SearchResultPopup search={search} />) : null
      }
    </div>
  )
}

