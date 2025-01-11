"use client";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { fields3 } from "../register/fields";
import InputField from "@/app/components/auth/register/InputField";
import { signIn } from "next-auth/react";
import GoogleOauth from "../googleOauth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shown, setShown] = useState(false);
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });

  const router = useRouter()

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
      setErrorMessage("Credenciales incorrectas");
      return;
    }

    //window.location.href = "/";
    router.push('/')
  };


  return (
    <section className="min-h-screen flex justify-around items-center bg-secondary-lightgray">
      <div className="absolute left-0 top-0 ml-4 mt-4">
        <Link href="/">
          <img src="/svg/conectando-icon.svg" alt="Logo" className="h-10" />
        </Link>
      </div>
      <article className="w-[538px] px-12 py-12 bg-secondary-white shadow-md flex flex-col rounded-3xl">
        <div className="flex w-full justify-center items-center flex-col">
          <h2 className="text-5xl font-extrabold text-primary-blue">¡Hola de nuevo!</h2>
        </div>

        {fields3.map((field, index) => (
          <div key={index} className="w-full my-4">
            <label
              htmlFor={field.name}
              className="block mb-1 font-bold text-base"
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

        <button className="w-full h-[35px] text-primary-blue font-semibold text-xs text-left">
          Restablecer contraseña
        </button>

        <div className="w-full flex flex-col justify-center">
          <div className="text-red-500 w-full flex justify-center">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <button
            id="submit"
            type="submit"
            className=" w-full h-[40px] bg-primary-blue rounded-full text-secondary-white mb-2 hover:scale-105 duration-150 text-lg"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>
        </div>
        <GoogleOauth check={true} />
        <button className="w-full h-[35px] text-sm cursor-default">
          Necesitas una cuenta? <Link className="text-primary-blue font-semibold cursor-pointer" href='/auth/register'>Registrate</Link>
        </button>
      </article>
    </section>
  );
}
