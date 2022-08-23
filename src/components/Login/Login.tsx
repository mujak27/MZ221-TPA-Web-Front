import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { queryLogin } from "../../lib/graphql/queries";
import { strings } from "../../utils/strings";
import {gapi} from 'gapi-script'
import {OauthGoogleLogin} from "../Oauth/Login"
import { CommentCreate } from "../post/Comment/Create";
// import '../styles/LoginRegister.css'

type props={

};

export const Login:React.FC<props> = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, {data : loginData, loading, called}] = useLazyQuery(queryLogin);
  

  const onLogin = ()=>{
    try{
      login({variables:{
        "input":{
          Email : email,
          Password : password,
        }
      }})
    }catch(e){
      alert(e);
    }
  }

  if(called){
    if(!loading) {
      if(loginData){
        localStorage.setItem(strings.sessionKey, loginData.login.token);
        alert('success')
      }else{
        alert('failed');
      }
    }
  }

  return (
    <>
      <div className="loginWrapper">
        <div className="login">
          <h1>Login</h1>
          <label>email</label>
          <input 
            type="email" 
            value={email}
            onChange={e=>{setEmail(e.currentTarget.value)}}
            placeholder="email"
            />
          <label>password</label>
          <input 
            type="password" 
            value={password}
            onChange={e=>{setPassword(e.currentTarget.value)}}
            placeholder="password"
            />
          <button onClick={onLogin}>login</button>
          {called && (!loading && loginData ? (<Navigate to={'/'} />) : (<>failed</>))}
          <div>
            <p>forget password?</p>
            <NavLink to="/forget">forget password</NavLink>
          </div>
          <div>
            <p>not registered yet?</p>
            <NavLink to="/register">Register</NavLink>
          </div>
        </div>
        <OauthGoogleLogin />
      </div>
    </>
  )
}

