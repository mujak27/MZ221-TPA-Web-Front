import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { mutationActivate } from "../../lib/graphql/mutations";
import { queryActivation, queryLogin } from "../../lib/graphql/queries";
import { User } from "../../types/User";
import { strings } from "../../utils/strings";
// import '../styles/LoginRegister.css'

type props={

};

export const Activation:React.FC<props> = () => {
  const [processing, setProcessing] = useState(false);


  const activationId = useParams().activationId;

  const {data : activationData, loading: loadingActivation, called: calledActivation} = useQuery(queryActivation, {
    variables: {
      id : activationId
    }
  });

  const [activate, {called, loading: loadingActivate, data: activateData}] = useMutation(mutationActivate)
  

  const onActivate = (userId : string)=>{
    try{
      activate({
        variables: {
          id : userId
        }
      })
      setProcessing(true);
    }catch(e){
      alert(e);
    }
  }

  if(processing){
    if(!loadingActivate){
      setProcessing(false);
      if(!activateData) alert("failed");
      else alert("success");
    }
  }

  if(loadingActivation){
    return (
      <>checking activation link...</>
    )
  }


  if(!activationData){
    return (
      <>invalid activation link</>
    )
  }

  const user = activationData.Activation.User as User;

  if(user.IsActive){
    return (
      <>
        you already activated this account
        <br />
        <NavLink to={'/'}>back to home</NavLink>
      </>
    )
  }

  return (
    <>
      <div className="activationWrapper">
        <div className="activation">
          <h1>Activate Account</h1>
          <p>
            click 
            <button onClick={()=>onActivate(user.ID)}>here</button> 
            to activate account {user.Email}
          </p>
          {
            processing ? <>processing </> : null
          }
          {activateData ? (<Navigate to={'/'} />) : null}
        </div>
      </div>
    </>
  )
}

