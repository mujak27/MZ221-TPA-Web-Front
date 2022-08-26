import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useContextProvider } from '../../Provider/ContextProvider';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { strings } from '../../utils/strings';
import { concatUserName } from '../../utils/User';
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
  const [logout, setLogout] = useState(false)

  const onLogout = ()=>{
    localStorage.removeItem(strings.sessionKey);
    setLogout(true)
  }

  if(logout){
    return <Navigate to={"login"} />
  }

  return (
    <div>
      <NavLink to={"/profile/" + user.ID}>
        <>welcome, {concatUserName(user)}</>
      </NavLink>
      <NavLink to={"/notifications/"}>
        <>notifications</>
      </NavLink>
      <NavLink to={"/networks/"}>
        <>networks</>
      </NavLink>
      <NavLink to={"/jobs/"}>
        <>jobs</>
      </NavLink>
      <button onClick={onLogout}>logout</button>
      <SearchBar onSearchHandle={onSearchHandle} />
      {
        showPopup ? (<SearchResultPopup search={search} />) : null
      }
    </div>
  )
}

