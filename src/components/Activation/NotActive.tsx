import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { mutationSendActivation } from "../../lib/graphql/mutations";
import { queryActivation, queryLogin } from "../../lib/graphql/queries";
import { User } from "../../types/User";
import { strings } from "../../utils/strings";
// import '../styles/LoginRegister.css'

type props={
  user : User
};

export const NotActive:React.FC<props> = ({user}) => {
  const [processing, setProcessing] = useState(false);

  const [sendActivation, {called, loading: loadingSendActivation}] = useMutation(mutationSendActivation)

  const onSendActivation = ()=>{
    try{
      sendActivation({
        variables: {
          id : user.ID
        }
      })
      setProcessing(true);
    }catch(e){
      alert(e);
    }
  }

  
  if(processing){
    if(!loadingSendActivation){
      setProcessing(false);
      alert("email has been sent!");
    }
  }

  return (
    <>
      <div className="activationWrapper">
        <div className="activation">
          <h1>Activate Account</h1>
          <p>
            your account is not activated yet. 
            click 
            <button 
              onClick={onSendActivation}
              disabled={processing}
            >
              here
            </button> 
            to resend your activation
          </p>
          {
            processing ? <>processing </> : null
          }
        </div>
      </div>
    </>
  )
}

