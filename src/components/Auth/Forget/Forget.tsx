import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { validate } from "graphql";
import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { toastError, toastPromise } from "../../../Elements/Toast/Toast";
import { mutationForgetPassword } from "../../../lib/graphql/mutations";
import { qIsEmailValid, qIsEmailValidVars } from "../../../lib/graphql/queries";
import { useThemeContext } from "../../../Provider/ThemeProvider";
import { validateEmail } from "../../../utils/validation";
import "../style.sass"
import { UserMiddleware } from "../UserMiddleware";

type props={

};

export const Forget:React.FC<props> = () => {

  const {currTheme} = useThemeContext();
  const [succesForget, setSuccesForget] = useState(false)

  const [email, setEmail] = useState('');
  
  const [isValidEmailFunc ] = useLazyQuery(qIsEmailValid);
  const [forgetPasswordFunc ] = useMutation(mutationForgetPassword);
  

  const onForget = async ()=>{
    if(!validateEmail(email, currTheme)) return
  try{
      toastPromise(
        forgetPasswordFunc({variables:{
          "email": email
        }}).then((data)=>{
          if(data){
            setSuccesForget(true)
          }
        }), 
        currTheme
      )
    }catch(e){
      alert(e);
    }
  }

  if(succesForget) return (<Navigate to={"/login"} />)

  return (
    <>
      <UserMiddleware homeToGuest={false} />
      <div id="forgetWrapper">
        <img id="logo" src="logo.png" />
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

