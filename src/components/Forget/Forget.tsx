import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { mutationForgetPassword } from "../../lib/graphql/mutations";
import { queryLogin } from "../../lib/graphql/queries";
import { strings } from "../../utils/strings";
// import '../styles/LoginRegister.css'

type props={

};

export const Forget:React.FC<props> = () => {

  const [email, setEmail] = useState('');
  
  const [forgetPasswordFunc, {data : forgetPasswordData, loading: forgetPasswordLoading, called: forgetPasswordCalled}] = useMutation(mutationForgetPassword);
  

  const onForget = ()=>{
    try{
      forgetPasswordFunc({variables:{
        "email": email
      }})
    }catch(e){
      alert(e);
    }
  }

  if(forgetPasswordCalled){
    if(!forgetPasswordLoading) {
      if(forgetPasswordData){
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
          <h1>Forget</h1>
          <label>email</label>
          <input 
            type="email" 
            value={email}
            onChange={e=>{setEmail(e.currentTarget.value)}}
            placeholder="email"
            />
          <button onClick={onForget}>send email</button>
          {forgetPasswordCalled && (!forgetPasswordLoading && forgetPasswordData ? (<Navigate to={'/'} />) : (<>failed</>))}
          <div>
            <p>login?</p>
            <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

