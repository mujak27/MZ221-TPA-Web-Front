import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { mutationForgetPassword } from "../../../lib/graphql/mutations";
import "../style.sass"
import { UserMiddleware } from "../UserMiddleware";

type props={

};

export const Forget:React.FC<props> = () => {

  const [succesForget, setSuccesForget] = useState(false)

  const [email, setEmail] = useState('');
  
  const [forgetPasswordFunc, {error : forgetPasswordError}] = useMutation(mutationForgetPassword);
  

  const onForget = async ()=>{
    try{
      forgetPasswordFunc({variables:{
        "email": email
      }}).then((data)=>{
        if(data){
          alert("success")
          setSuccesForget(true)
        }
      })
    }catch(e){
      alert(e);
    }
  }

  if(succesForget) return (<Navigate to={"/login"} />)

  return (
    <>
      <UserMiddleware homeToGuest={false} />
      <div id="forgetWrapper">
        <div id="forget">
          <h1>Forget password</h1>
          <input 
            type="email" 
            value={email}
            onChange={e=>{setEmail(e.currentTarget.value)}}
            placeholder="email"
            />
          <button className={"button2"} onClick={onForget}>send reset password email</button>
        </div>
        <div id="changeMethod">
          <p> 
            remember your password? <NavLink className={"button1"} to="/login">Login</NavLink>
          </p>
        </div>
      </div>
    </>
  )
}

