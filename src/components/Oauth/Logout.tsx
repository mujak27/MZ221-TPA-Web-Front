import { GoogleLogout } from 'react-google-login'
import React, { useState } from "react";

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

const OauthGoogleLogout = () => {

  const onSuccess = ()=>{

  }

  const onFailure = (res : any)=>{

  }

  return (
    <div>
      <GoogleLogout
          clientId={googleConfig.web.client_id}
          onLogoutSuccess={onSuccess}
          buttonText={"logout google"}
        />
    </div>
  )
}