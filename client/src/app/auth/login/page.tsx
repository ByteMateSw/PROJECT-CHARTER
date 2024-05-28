"use client";
import { login } from "@/app/api/user";
import GoogleOauth from "@/app/auth/googleOauth";
import {
  GoogleCredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { fields3 } from "../register/fields";
import InputField from "@/app/components/auth/register/InputField";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shown, setShown] = useState(false);
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setErrorMessage("");
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    if (!user.email || !user.password) {
      setErrorMessage("Por favor, complete todos los campos");
      return;
    }

    const email = user.email;
    const password = user.password;

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrorMessage(responseNextAuth.error);
      return;
    }
        
     window.location.href = "/";
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
            <div className="font-bold text-xl my-6 mr-7 pb-2 border-b-4 border-black select-none">
              Iniciar Sesión
            </div>
            <a href="/auth/register">
              <button className="font-bold text-xl my-6 ml-7 text-secondary-gray pb-2 border-b-4 hover:scale-105 duration-150">
                Registrarse
              </button>
            </a>
          </section>
        </div>

        {fields3.map((field, index) => (
          <div key={index} className="w-full my-4">
            <label
              htmlFor={field.name}
              className="block mb-1 ml-4 font-bold text-xl"
            >
              {field.label}
            </label>
            <InputField
              id={field.name}
              autoComplete={field.autoComplete}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={user[field.name]}
              onChange={handleChange}
              iconSrc={field.iconSrc}
            />
          </div>
        ))}

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
            <input className="switch mx-2" type="checkbox" name="" id="" />
            Mantener sesión iniciada
          </label>
          <button className="w-[180px] h-[35px] text-primary-blue font-semibold hover:border-primary-blue hover:border-b duration-150">
            Restablecer contraseña
          </button>
        </div>
        <div className="w-full flex flex-col justify-center mt-4">
          <div className="text-red-500 w-full flex justify-center mb-4">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <button
            id="submit"
            type="submit"
            className=" w-full h-[40px] bg-primary-blue rounded-xl text-secondary-white text-xl mb-2 hover:scale-105 duration-150"
            onClick={handleLogin}
          >
            Continuar
          </button>
        </div>
        <div className="divider divider-horizontal">o</div>
        <GoogleOAuthProvider clientId="483719238317-0b67hs4cfkkhbr17ieikrknd9h7oib12.apps.googleusercontent.com">
          <GoogleOauth check={true} />
        </GoogleOAuthProvider>
      </article>

      <picture className="hidden md:flex justify-around ">
        <img src="/svg/Imagotype.svg" alt="Logotype" />
      </picture>
    </section>
  );
}
