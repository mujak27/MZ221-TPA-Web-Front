import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { queryLogin, queryRegister } from "../../lib/graphql/queries";
import { strings } from "../../utils/strings";
// import '../styles/LoginRegister.css'

type props={

};


export const Register:React.FC<props> = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [midName, setMidName] = useState('');
  
  const [register, {data : registerData, loading, called}] = useLazyQuery(queryRegister);
  

  const onLogin = ()=>{
    try{
      register({variables:{
        "input": {
          "Email": email,
          "Password": password,
          "FirstName": firstName,
          "LastName": lastName,
          "MidName": midName,
        }
      }})
    }catch(e){
      alert(e);
    }
  }

  if(called){
    if(!loading) {
      if(registerData){
        localStorage.setItem(strings.sessionKey, registerData.register.token);
        alert('success')
      }else{
        alert('failed');
      }
    }
  }

  return (
    <>
      <div className="registerWrapper">
        <div className="register">
          <h1>Register</h1>

          <label>email</label>
          <input 
            type="email" 
            value={email}
            onChange={e=>{setEmail(e.currentTarget.value)}}
            placeholder="email"
            />

          <label>first name</label>
          <input 
            type="text" 
            value={firstName}
            onChange={e=>{setFirstName(e.currentTarget.value)}}
            placeholder="first name"
            />
          
          
          <label>Middle name</label>
          <input 
            type="text" 
            value={midName}
            onChange={e=>{setMidName(e.currentTarget.value)}}
            placeholder="middle name"
            />
            
          <label>Last name</label>
          <input 
            type="text" 
            value={lastName}
            onChange={e=>{setLastName(e.currentTarget.value)}}
            placeholder="last name"
            />

          <label>password</label>
          <input 
            type="password" 
            value={password}
            onChange={e=>{setPassword(e.currentTarget.value)}}
            placeholder="password"
            />

          <button onClick={onLogin}>register</button>

          {called && (!loading && registerData ? (<Navigate to={'/'} />) : (<>failed</>))}

          <p>have an account?</p>
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </>
  )
}

