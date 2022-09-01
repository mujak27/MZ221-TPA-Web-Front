import { GoogleLogin } from 'react-google-login'
import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { strings } from '../../../utils/strings';
import { Navigate } from 'react-router-dom';
import { mutationLoginRegisWithSso } from '../../../lib/graphql/mutations';

const googleConfig = {
  "web": {
    "client_id":"1000636714821-kektrh8ntcc0oraniadsapp6nd1av9q3.apps.googleusercontent.com",
    "project_id":"xenon-poet-360208",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret":"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",
    "redirect_uris":["http://localhost:5173"],
    "javascript_origins":["http://localhost:5173"]
  }
}

type props = {

}

export const OauthGoogleLogin:React.FC<props> = () => {

  const [successLogin, setSuccessLogin] = useState(false)

  const [loginRegisWithSsoFunc, {called : loginRegisWithSsoCalled, loading:loginRegisWithSsoLoading, data : loginRegisWithSsoData}] = useMutation(mutationLoginRegisWithSso)

  const onLogin = (response : any)=>{
    loginRegisWithSsoFunc({
      variables: {
        "GoogleToken" : response.credential
      }
    }).then((data)=>{
      localStorage.setItem(strings.sessionKey, data.data.LoginRegisWithSSO)
      setSuccessLogin(true)
    })
  }

  useEffect(()=>{
    window.google?.accounts.id.initialize({
      client_id : "991139370977-724qdcg8dghdp0ald1hm350j8um2v4hn.apps.googleusercontent.com",
      callback: onLogin
    })
    window.google?.accounts.id.renderButton(
      document.getElementById("googleLoginButton") as HTMLElement,{
        type: "standard",
        theme: "outline", 
        size: "large",
        shape: "circle"
      }
    )
  }, [])

  return (
    <>
      <div id="googleLoginButton" />
      {successLogin && (<Navigate to={'/'} />)}
    </>
  )
}