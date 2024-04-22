"use client";
import Link from "next/link";



export default function LoginPage() {
 
  return (
    <section className="min-h-screen flex justify-around items-center bg-secondary-white overflow-hidden">
      <picture className="flex justify-around ">
        <img src="/svg/Imagotype.svg" alt="Logotype" />
      </picture>

      <article className="w-[550px] px-12 py-8 bg-secondary-white flex flex-col">
        <div className="flex justify-center items-center flex-col">
          <img
            className="mb-6 "
            src="/svg/BIENVENIDO! (1).svg"
            alt="svgimgg"
          ></img>
          <h1 className="font-bold text-3xl mb-6">Iniciar Sesión</h1>
        </div>

        <div className="my-4">
          <label className="block mb-1 font-bold text-xl">
            Correo electrónico o Celular
          </label>
          <span className="flex items-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
            <img src="/svg/Mail-Icon.svg" alt="LockIcon" className="mr-2" />
            <input
              className="w-full h-15 focus:outline-none bg-secondary-white"
              type="text"
              name="email"
              placeholder="Correo@correo.com"
            />
          </span>
        </div>

        <div className="my-4">
          <label htmlFor="pass" className="block mb-1 font-bold text-xl">
            Contraseña
          </label>
          <span className="flex items-center border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
            <img src="/svg/Lock-Icon.svg" alt="LockIcon" className="mr-2" />
            <input
              id="pass"
              className="w-full h-15 focus:outline-none bg-secondary-white"
              type="password"
              name="password"
              placeholder="····················"
            />
            <button>
              <img
                src="/svg/VisibilityOff-Icon.svg"
                alt="ojito"
              />
            </button>
          </span>
        </div>

        <div className="flex w-full justify-between font-semibold items-center">
          <input
            type="checkbox"
            id="SesiónIniciada"
            name="InicSes"
            className="hidden"
          />
          <label htmlFor="InicSes" className="flex items-center">
            <img
              src="/svg/ToggleOff-Icon.svg"
              alt="ToggleButton"
              className="mr-3"
            />
            Mantener sesión iniciada
          </label>
          <button className="w-[180px] h-[35px] text-secondary-black font-semibold hover:scale-105">
            Restablecer contraseña
          </button>
        </div>

        <div className="w-full flex flex-col justify-center my-4 overflow-hidden">
          <button
            id="submit"
            type="submit"
            className=" w-full h-[40px] bg-primary-blue rounded-xl text-secondary-white text-xl mb-2 hover:scale-105"
          >
            Continuar
          </button>
        
          
          <p className="flex justify-center">
            Sos nuevo?{" "}
            <Link href="" className="text-primary-blue hover:underline ml-1">
              {" "}
              Podes registrarte acá
            </Link>
          </p>
        </div>
      </article>
    </section>
    )
  }

