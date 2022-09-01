import '../style.sass';

import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';

import { toastPromise } from '../../../Elements/Toast/Toast';
import { mutationLogin } from '../../../lib/graphql/mutations';
import { useThemeContext } from '../../../Provider/ThemeProvider';
import { strings } from '../../../utils/strings';
import { OauthGoogleLogin } from '../Oauth/Oauth';
import { UserMiddleware } from '../UserMiddleware';

type props={

};

export const Login:React.FC<props> = () => {

  const {currTheme} = useThemeContext()
  const [successLogin, setSuccessLogin] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, {data : loginData, loading, called}] = useMutation(mutationLogin);
  

  const onLogin = async ()=>{
    try{
      toastPromise(
        login({variables:{
          "input":{
            Email : email,
            Password : password,
          }
        }}).then((data)=>{
          localStorage.setItem(strings.sessionKey, data.data.Login);
          setSuccessLogin(true)
        }),
        currTheme
      )
    }catch(e){
      alert(e);
    }
  }


  if(successLogin) return <Navigate to={'/'} />

  return (
    <>
      <UserMiddleware homeToGuest={false} />
      <div id="loginRegisterWrapper">
        <div id="login">
          <h1>Sign in</h1>
          <p>stay updated on your professional world</p>
          <input 
            required
            type="email" 
            value={email}
            onChange={e=>{setEmail(e.currentTarget.value)}}
            placeholder="email"
            />
          <input 
            required
            type="password" 
            value={password}
            onChange={e=>{setPassword(e.currentTarget.value)}}
            placeholder="password"
            />
          <div className="button1">
            <NavLink to="/forget">forget password</NavLink>
          </div>
          <button className="button2" onClick={onLogin}>sign in</button>
          <OauthGoogleLogin />
        </div>
        <div id="changeMethod">
          <p>new to linkhed in?
          </p>
          <NavLink className="button1" to="/register">Join now</NavLink>
        </div>
      </div>
    </>
  )
}

