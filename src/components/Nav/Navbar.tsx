import './style.sass';

import React, { useState } from 'react';
import { BsPeople } from 'react-icons/bs';
import { FaBars, FaHome, FaLinkedin, FaRegBell } from 'react-icons/fa';
import { IoReaderOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

import { UserProfilePhoto } from '../../Elements/User/UserProfilePhoto';
import { useUserContext } from '../../Provider/UserProvider';
import { Icon } from '../../styles/Icon/IconContext';
import { IconBig, IconSmall } from '../../styles/Icon/IconStyles';
import { TypeSearch } from '../../types/Search';
import { SearchBar } from './SearchBar';
import { UserPopup } from './UserPopup';

type props={
  onSearchHandle: (searchString: string) => void
};


export const Navbar:React.FC<props> = ({onSearchHandle}) => {

  const [showUserPopup, setShowUserPopup] = useState(false)
  const [showNavbarMenu, setShowNavbarMenu] = useState(false)
  const {user} = useUserContext();
  console.info(user)

  const onClosePopup = ()=>{
    setShowNavbarMenu(false)
    setShowUserPopup(false)
  }

  const onToggleNavbarMenu = ()=>{
    setShowNavbarMenu(!showNavbarMenu);
    setShowUserPopup(false)
  }

  return (
    <div id="navBarWrapper">
      <div id="navBar">
        <div id="navSearch">
          <Icon config={IconBig} icon={<FaLinkedin />}  />
          <SearchBar onSearchHandle={onSearchHandle} />
        </div>
        <div id="navButton" onClick={onToggleNavbarMenu}>
            <div id="navMenuIcon">
              <Icon config={IconSmall} icon={<FaBars />} /> 
            </div>
        </div>
        <div id="navMenu" className={showNavbarMenu ? 'active' : ""}>
          <NavLink to={"/"}  onClick={onClosePopup}>
            <div id="navMenuIcon">
              <Icon config={IconSmall} icon={<FaHome />} /> 
            </div>
            <p>home</p>
          </NavLink>
          <NavLink to={"/notifications/"}  onClick={()=>{onClosePopup}}>
            <div id="navMenuIcon">
              <Icon config={IconSmall} icon={<FaRegBell />} /> 
            </div>
            <p>notifications</p>
          </NavLink>
          <NavLink to={"/networks/"}  onClick={()=>{onClosePopup}}>
            <div id="navMenuIcon">
              <Icon config={IconSmall} icon={<BsPeople />} /> 
            </div>
            <p>networks</p>
          </NavLink>
          <NavLink to={"/jobs/"}  onClick={()=>{onClosePopup}}>
            <div id="navMenuIcon">
              <Icon config={IconSmall} icon={<IoReaderOutline />} /> 
            </div>
            <p>jobs</p>
          </NavLink>
          <div onClick={()=>setShowUserPopup(!showUserPopup)}>
            <div id="navMenuIcon">
              <UserProfilePhoto user={user} />
              {/* <img className="userProfilePhoto userImage" src={getUserProfilePhoto(user)} /> */}
            </div>
            <p>me</p>
            { showUserPopup && (
              <div onClick={onClosePopup}>
                <UserPopup  />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

