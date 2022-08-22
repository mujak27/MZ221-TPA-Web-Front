import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { mutationResetPassword } from "../../lib/graphql/mutations";
import { queryCheckReset, queryLogin } from "../../lib/graphql/queries";
import { User } from "../../types/User";
import { strings } from "../../utils/strings";
import { concatUserName } from "../../utils/User";
// import '../styles/LoginRegister.css'

type props={

};

export const Reset:React.FC<props> = () => {
  
  const resetId = useParams().resetId;

  const [processing, setProcessing] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const {data : checkResetData, loading: checkResetLoading} = useQuery(queryCheckReset, {
    variables: {
      id : resetId
    }
  });

  const [resetPasswordFunc, {called: resetPasswordCalled, loading: resetPasswordLoading, data: resetPasswordData}] = useMutation(mutationResetPassword)
  
  const onResetPassword = ()=>{
    if(password != confirmPassword){
      alert("password not same!")
      return
    }
    try{
      resetPasswordFunc({
        variables: {
          "id": resetId,
          "password": password
        }
      })
      setProcessing(true);
    }catch(e){
      alert(e);
    }
  }

  if(processing){
    if(!resetPasswordLoading){
      setProcessing(false);
      if(!resetPasswordData) alert("failed");
      else alert("success");
    }
  }

  if(checkResetLoading){
    return (
      <>checking activation link...</>
    )
  }


  console.info(checkResetData)

  if(!checkResetData){
    return (
      <>invalid reset password link</>
    )
  }

  const user = checkResetData.CheckReset as User;



  return (
    <>
      <div className="loginWrapper">
        <div className="login">
          <h1>reset password for {concatUserName(user)}</h1>
          <label>new password</label>
          <input 
            type="password" 
            value={password}
            onChange={e=>{setPassword(e.currentTarget.value)}}
            placeholder="password"
            />
          <label>confirm password</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={e=>{setConfirmPassword(e.currentTarget.value)}}
            placeholder="confirm password"
            />
          <button onClick={onResetPassword}>login</button>
          {resetPasswordCalled && !resetPasswordLoading && ( resetPasswordData  ? (<Navigate to={'/'} />) : (<>failed</>))}
          <div>
            <p>forget password?</p>
            <NavLink to="/forget">forget password</NavLink>
          </div>
          <div>
            <p>not registered yet?</p>
            <NavLink to="/register">Register</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

