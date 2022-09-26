import '../style.sass';

import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';

import { ErrorPage } from '../../../Elements/Error/ErrorPage';
import { mutationResetPassword } from '../../../lib/graphql/mutations';
import { queryCheckReset } from '../../../lib/graphql/queries';
import { useThemeContext } from '../../../Provider/ThemeProvider';
import { User } from '../../../types/User';
import { concatUserName } from '../../../utils/User';
import { validatePassword } from '../../../utils/validation';

type props={

};

export const Reset:React.FC<props> = () => {
  
  const {currTheme} = useThemeContext();
  const resetId = useParams().resetId;

  const [successReset, setSuccessReset] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const {data : checkResetData, loading: checkResetLoading} = useQuery(queryCheckReset, {
    variables: {
      id : resetId
    }
  });

  const [resetPasswordFunc] = useMutation(mutationResetPassword)
  
  const onResetPassword = ()=>{
    if(!validatePassword(password, currTheme, confirmPassword)) return 
    try{
      resetPasswordFunc({
        variables: {
          "id": resetId,
          "password": password
        }
      }).then((data)=>{
        setSuccessReset(true)
      })
    }catch(e){
    }
  }

  if(checkResetLoading){
    return (
      <>checking activation link...</>
    )
  }

  if(successReset){
    return <Navigate to={"/login"} />
  }

  if(!checkResetData){
    return (
      <ErrorPage text="invalid reset password link" />
    )
  }

  const user = checkResetData.CheckReset as User;



  return (
    <>
      <div id="resetWrapper">
        <img id="logo" src="logo.png" />
        <div id="reset">
          <h1>reset password for {concatUserName(user)}</h1>
          <input 
            type="password" 
            value={password}
            onChange={e=>{setPassword(e.currentTarget.value)}}
            placeholder="password"
            />
          <input 
            type="password" 
            value={confirmPassword}
            onChange={e=>{setConfirmPassword(e.currentTarget.value)}}
            placeholder="confirm password"
            />
          <button className="button2" onClick={onResetPassword}>set password</button>
        </div>
        <div id="changeMethod">
          <p>swicth account?</p>
          <NavLink className={"button1"} to="/login">login</NavLink>
        </div>
      </div>
    </>
  )
}

