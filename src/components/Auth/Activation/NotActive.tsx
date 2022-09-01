import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toastPromise } from '../../../Elements/Toast/Toast';

import { mutationSendActivation } from '../../../lib/graphql/mutations';
import { useThemeContext } from '../../../Provider/ThemeProvider';
import { useUserContext } from '../../../Provider/UserProvider';
import { User } from '../../../types/User';

import '../style.sass'

type props={
  user : User
};

export const NotActive:React.FC<props> = ({user}) => {
  
  const { logOutHandler } = useUserContext()
  const {currTheme} = useThemeContext()
  const [processing, setProcessing] = useState(false);

  const [sendActivation, {called, loading: loadingSendActivation}] = useMutation(mutationSendActivation)

  const onSendActivation = async ()=>{
    try{
      toastPromise(
        sendActivation({
          variables: {
            id : user.ID
          }
        }).then((data)=>{
          
        }),
        currTheme
      )
    }catch(e){
      alert(e);
    }
  }

  const onLogOut = ()=>{
    logOutHandler()
  }

  
  if(processing){
    if(!loadingSendActivation){
    }
  }

  return (
    <>
      <div id="activationWrapper">
        <div id="activation">
          <h1>Activate Account</h1>
          <p>
            your account is not activated yet. 
            click 
            <button 
            className='button1'
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
        <div id="changeMethod">
          <p>switch account?</p>
          <button className="button1" onClick={onLogOut}>Sign in</button>
        </div>
      </div>
    </>
  )
}

