import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { ErrorPage } from "../../../Elements/Error/ErrorPage";
import { mutationResetPassword } from "../../../lib/graphql/mutations";
import { queryCheckReset } from "../../../lib/graphql/queries";
import { User } from "../../../types/User";
import { strings } from "../../../utils/strings";
import { concatUserName } from "../../../utils/User";
import '../style.sass'
import { UserMiddleware } from "../UserMiddleware";

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

  if(!checkResetData){
    return (
      <ErrorPage text="invalid reset password link" />
    )
  }

  const user = checkResetData.CheckReset as User;



  return (
    <>
      <div id="resetWrapper">
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

