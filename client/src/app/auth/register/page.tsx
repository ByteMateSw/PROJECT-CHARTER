"use client";
import { login } from "@/app/api/user";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <picture className="flex justify-around ">
        <img src="/svg/Imagotype.svg" alt="Logotype" />
      </picture>

      <article className="w-[700px] px-12 py-12 bg-secondary-white flex flex-col">
        <div className="flex justify-center items-center flex-col">
          <img
            className="mb-6 "
            src="/svg/BIENVENIDO! (1).svg"
            alt="svgimgg"
          ></img>
          <section className="flex items-center">
            <a href="http://localhost:3000/auth/login">
              <button className="font-bold text-xl my-6 mr-7 text-secondary-gray  pb-2 border-b-4 hover:scale-105">
                Iniciar Sesión
              </button>
            </a>
            <div className="font-bold text-xl my-6 ml-7 pb-2 border-b-4 border-black select-none">
              Registrarse
            </div>
          </section>
        </div>

        <section className="w-full flex items-center justify-between my-4">
          <div>
            <label className="block mb-1 ml-4 font-bold text-xl">
              Nombre
            </label>
            <span className="w-72 h-12 flex items-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
              <img
                src="/svg/person.svg"
                alt="PerosnIcon"
                className="mr-2 mt-2 select-none"
              />
              <input
                className="w-full h-15 focus:outline-none bg-secondary-white"
                type="text"
                name="Name"
                placeholder="Jhon"
              />
            </span>
          </div>

          <div>
            <label className="block mb-1 ml-4 font-bold text-xl">
              Apellido
            </label>
            <span className="w-72  h-12 flex items-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
              <img
                src="/svg/person.svg"
                alt="PerosnIcon"
                className="mr-2 mt-2 select-none"
              />
              <input
                className="w-full h-15 focus:outline-none bg-secondary-white"
                type="text"
                name="Name"
                placeholder="Doe"
              />
            </span>
          </div>

        </section>

        <div className="my-4">
          <label className="block ml-4 mb-1 font-bold text-xl">
            Correo electrónico
          </label>
          <span className=" h-12 flex items-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
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
          <label htmlFor="pass" className="block ml-4 mb-1 font-bold text-xl">
            Contraseña
          </label>
          <span className=" h-12 flex items-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
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

        <div className="w-full flex flex-col justify-center my-4">
          <div className="text-red-500 w-full flex justify-center mb-4">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <button
            id="submit"
            type="submit"
            className=" w-full h-12 bg-primary-blue rounded-3xl text-secondary-white text-xl mb-2 hover:scale-105"
            onClick={handleLogin}
          >
            Continuar
          </button>
        </div>

        <div className="divider divider-horizontal">o</div>

        <div className="my-8">
          <span className="w-full h-12 flex items-center justify-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white hover:scale-105">
            <img
              src="/svg/Google.svg"
              alt="GoogleIcon"
              className="mr-2 select-none"
            />
            <button className="text-xl">
              Contiuar con Google
            </button>
          </span>
        </div>
      </article>
    </section>
  );
}
