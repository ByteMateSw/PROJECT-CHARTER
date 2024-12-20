"use client";
import { useGoogleLogin } from '@react-oauth/google';
import { signIn } from 'next-auth/react';

export default function GoogleOauth({check}: {check: boolean} ) {

  
  //console.log(session)


  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  // });
  // const register = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  // });

  return (
    <div className="my-2">
      <span className={check ? 
      "w-full h-12 flex items-center justify-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white hover:scale-105 duration-150"
      : "w-full h-12 flex items-center justify-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white opacity-35"
    }>
        <img
          src="/svg/Google.svg"
          alt="GoogleIcon"
          className="mr-2 select-none"
        />
        <button onClick={() => signIn('google', {
          callbackUrl: '/'
        })} className="text-xl w-full" disabled={!check}>Continuar con Google</button>
      </span>
    </div>
  );
}
