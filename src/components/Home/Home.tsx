import './style.sass';

import React, { useEffect, useState } from 'react';

import { useThemeContext } from '../../Provider/ThemeProvider';
import { Posts } from '../post/Posts';

type props={

};

export const Home:React.FC<props> = () => {

  const {currTheme} = useThemeContext()

  return (
    <div id='home'>
        <Posts /> 
    </div>
  )
}

