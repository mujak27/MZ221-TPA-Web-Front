import './style.sass';

import React, { useState } from 'react';
import { FaHome, FaLinkedin, FaRegBell } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { IoReaderOutline } from 'react-icons/io5';
import { Navigate, NavLink } from 'react-router-dom';

import { useUserContext } from '../../Provider/UserProvider';
import { strings } from '../../utils/strings';
import { useThemeContext } from '../../Provider/ThemeProvider';

type props={
};


export const UserPopup:React.FC<props> = ({}) => {
  const {user, logOutHandler} = useUserContext();
  const {changeCurrTheme} = useThemeContext()

  return (
    <div id="userPopupWrapper">
      <div id="userPopup">
        <NavLink to={"/profile/" + user.ProfileLink}>profile page</NavLink>
        
        <button onClick={()=>changeCurrTheme()}>change theme</button>
        <button onClick={()=>logOutHandler()}>logout</button>
      </div>
    </div>
  )
}

