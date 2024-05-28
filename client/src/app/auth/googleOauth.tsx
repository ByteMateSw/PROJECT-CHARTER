"use client";
import { useGoogleLogin } from '@react-oauth/google';

export default function GoogleOauth({check}: {check: boolean} ) {

  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });
  const register = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  return (
    <div className="my-2">
      <span className="w-full h-12 flex items-center justify-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white hover:scale-105 duration-150">
        <img
          src="/svg/Google.svg"
          alt="GoogleIcon"
          className="mr-2 select-none"
        />
        <button onClick={ check ? () => login() : ()=> register()} className="text-xl w-full">Continuar con Google</button>
      </span>
    </div>
  );
}
