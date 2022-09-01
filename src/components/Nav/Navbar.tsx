import './style.sass';

import React, { useState } from 'react';
import { FaHome, FaLinkedin, FaRegBell } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { IoReaderOutline } from 'react-icons/io5';
import { Navigate, NavLink } from 'react-router-dom';

import { useUserContext } from '../../Provider/UserProvider';
import { Icon } from '../../styles/Icon/IconContext';
import { IconBig, IconSmall } from '../../styles/Icon/IconStyles';
import { Search } from '../../types/Search';
import { strings } from '../../utils/strings';
import { concatUserName, getUserProfilePhoto } from '../../utils/User';
import { SearchBar } from './SearchBar';
import { SearchResultPopup } from './SearchResultPopup';
import { UserPopup } from './UserPopup';

type props={
  search : Search | undefined
  setSearch : React.Dispatch<React.SetStateAction<Search | undefined>>
  showPopup : boolean
  onSearchHandle: (searchString: string) => void
};


export const Navbar:React.FC<props> = ({search, setSearch, showPopup, onSearchHandle}) => {

  const [showUserPopup, setShowUserPopup] = useState(false)
  const {user} = useUserContext();

  const onClosePopup = ()=>{
    setShowUserPopup(false)
  }

  return (
    <div id="navBarWrapper">
      <div id="navBar">
        <div id="navSearch">
          <Icon config={IconBig} icon={<FaLinkedin />}  />
          <SearchBar onSearchHandle={onSearchHandle} />
          { showPopup && (<SearchResultPopup onClosePopup={onClosePopup} search={search} />)}
        </div>
        <div id="navMenu">
          <NavLink to={"/"}>
            <div id="navMenuIcon">
              <Icon config={IconSmall} icon={<FaHome />} /> 
            </div>
            <p>home</p>
          </NavLink>
          <NavLink to={"/notifications/"}>
            <div id="navMenuIcon">
              <Icon config={IconSmall} icon={<FaRegBell />} /> 
            </div>
            <p>notifications</p>
          </NavLink>
          <NavLink to={"/networks/"}>
            <div id="navMenuIcon">
              <Icon config={IconSmall} icon={<BsPeople />} /> 
            </div>
            <p>networks</p>
          </NavLink>
          <NavLink to={"/jobs/"}>
            <div id="navMenuIcon">
              <Icon config={IconSmall} icon={<IoReaderOutline />} /> 
            </div>
            <p>jobs</p>
          </NavLink>
          <div onClick={()=>setShowUserPopup(!showUserPopup)}>
            <div id="navMenuIcon">
              <img className="userProfilePhoto userImage" src={getUserProfilePhoto(user)} />
            </div>
            <p>me</p>
            { showUserPopup && (<UserPopup />)}
          </div>
        </div>
      </div>
    </div>
  )
}

