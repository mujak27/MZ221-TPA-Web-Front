import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { toastPromise } from "../../../Elements/Toast/Toast";
import { mutationRegister } from "../../../lib/graphql/mutations";
import { useThemeContext } from "../../../Provider/ThemeProvider";
import { strings } from "../../../utils/strings";
import { OauthGoogleLogin } from "../Oauth/Oauth";
import '../style.sass'
import { UserMiddleware } from "../UserMiddleware";

type props={

};


export const Register:React.FC<props> = () => {

  const {currTheme} = useThemeContext()
  const [successLogin, setSuccessLogin] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [midName, setMidName] = useState('');
  
  const [register, {data : registerData, loading, called}] = useMutation(mutationRegister);
  

  const onLogin = ()=>{
    try{
      toastPromise(
        register({variables:{
          "input": {
            "Email": email,
            "Password": password,
          }
        }}).then((data)=>{
          localStorage.setItem(strings.sessionKey, data.data.Register)
          setSuccessLogin(true)
        }),
        currTheme
      )

    }catch(e){
      alert(e);
    }
  }

  if(successLogin || localStorage.getItem(strings.sessionKey)) return <Navigate to={'/'} />

  return (
    <>
    <UserMiddleware homeToGuest={false} />
      <div id="loginRegisterWrapper">
        <div id="register">
          <h1>Make the most of your professional life</h1>

          <input 
            required
            type="email" 
            value={email}
            onChange={e=>{setEmail(e.currentTarget.value)}}
            placeholder="email"
            />


          <input 
            type="password" 
            value={password}
            onChange={e=>{setPassword(e.currentTarget.value)}}
            placeholder="password"
            />

          <button className="button2" onClick={onLogin}>register</button>
          <OauthGoogleLogin />
        </div>
        <div id="changeMethod">

          <p>Already on LinkhedIn?</p>
          <NavLink className="button1"to="/login">Sign in</NavLink>
        </div>
      </div>
    </>
  )
}

