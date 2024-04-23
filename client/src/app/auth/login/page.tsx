"use client";
import { login } from "@/app/api/user";
import GoogleOauth from "@/app/components/googleOauth";
import { GoogleCredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import { useState } from "react";
import React from 'react';



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shown, setShown] = useState(false)

  const switchShown = () => setShown(!shown)

  const handleLogin = async () => {
    const data = await login(email, password);
    console.log(data);
    //  window.location.href = "/";
  };

  return (
    <section className="min-h-screen flex justify-around items-center bg-secondary-white">
      <article className="w-[700px] px-12 py-12 bg-secondary-white flex flex-col">
        <div className="flex justify-center items-center flex-col">
          <img
            className="mb-6 "
            src="/svg/BIENVENIDO! (1).svg"
            alt="svgimgg"
          ></img>
          <section className="flex items-center">
            <div className="font-bold text-xl my-6 mr-7 pb-2 border-b-4 select-none">
              Iniciar Sesión
            </div>
            <a href="http://localhost:3000/auth/register">
              <button className="font-bold text-xl my-6 ml-7 text-secondary-gray pb-2 border-b-4 border-black hover:scale-105">
                Registrarse
              </button>
            </a>
          </section>
        </div>

        <div className="my-4">
          <label className="block mb-1 font-bold text-xl">
            Correo electrónico
          </label>
          <span className="flex items-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
            <img
              src="/svg/Mail-Icon.svg"
              alt="LockIcon"
              className="mr-2 select-none"
            />
            <input
              className="w-full h-15 focus:outline-none bg-secondary-white"
              type="text"
              name="email"
              placeholder="Correo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
        </div>

        <div className="my-4">
          <label htmlFor="pass" className="block mb-1 font-bold text-xl">
            Contraseña
          </label>
          <span className="flex items-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
            <img
              src="/svg/Lock-Icon.svg"
              alt="LockIcon"
              className="mr-2 select-none"
            />
            <input
              id="pass"
              className="w-full h-15 focus:outline-none bg-secondary-white"
              type={shown ? "text" : "password"}
              name="password"
              placeholder="····················"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={switchShown}>
              {shown ? (<img src="/svg/Visibility-Icon.svg" />) : (<img src="/svg/VisibilityOff-Icon.svg" />)}
            </button>
          </span>
        </div>

        <div className="flex w-full justify-between font-semibold items-center">
          <input
            type="checkbox"
            id="SesiónIniciada"
            name="InicSes"
            className="hidden"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
          />
          <label htmlFor="InicSes" className="flex items-center">
            <img
              src="/svg/ToggleOff-Icon.svg"
              alt="ToggleButton"
              className="mr-3 select-none"
            />
            Mantener sesión iniciada
          </label>
          <button className="w-[180px] h-[35px] text-secondary-black font-semibold hover:scale-105">
            Restablecer contraseña
          </button>
        </div>

        <div className="w-full flex flex-col justify-center mt-8">
          <div className="text-red-500 w-full flex justify-center mb-4">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <button
            id="submit"
            type="submit"
            className=" w-full h-[40px] bg-primary-blue rounded-xl text-secondary-white text-xl mb-2 hover:scale-105"
            onClick={handleLogin}
          >
            Continuar
          </button>
          <GoogleOAuthProvider clientId="483719238317-0b67hs4cfkkhbr17ieikrknd9h7oib12.apps.googleusercontent.com">
            <React.StrictMode>
                <GoogleOauth />
            </React.StrictMode>
          </GoogleOAuthProvider>,
          <p className="flex justify-center">
            Sos nuevo?
            <Link href="http://localhost:3000/auth/register" className="text-primary-blue hover:underline ml-1">
              Podes registrarte acá
            </Link>
          </p>
        </div>
      </article>

      <picture className="flex justify-around ">
        <img src="/svg/Imagotype.svg" alt="Logotype" />
      </picture>

    </section>
  );
}
