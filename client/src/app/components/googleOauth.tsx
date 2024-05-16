"use client";
import React from "react";
import { GoogleLogin} from "@react-oauth/google";

export default function GoogleOauth(){
    const onSuccess = (response:any) => {
        if ('profileObj' in response) {
          console.log(response.profileObj);
        }else{
          console.error('profileObj is not present in the response');
        }
      }
    
      const handleLoginError = (error:any) => {
        console.error('Error de inicio de sesión:', error);
  
    };

    return (
        <div className="App">
              <GoogleLogin
              onSuccess={onSuccess}
              onError={handleLoginError as () => void}
              />
        </div>
    )
}