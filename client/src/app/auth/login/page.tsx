import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center rounded-lg bg-transparent">
      <div className="">
       <img className="mb-10" src="/svg/conectando-logotype.svg" alt="svgimgg"></img>
      </div>
      <article className="w-[550px] px-12 py-12 rounded-3xl shadow-xl bg-secondary-white">
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-3xl mb-5">Iniciar Sesión</h1>
        </div>

        <div className="my-6">
          <label className="block mb-2 font-bold">Correo electrónico</label>
          <input
            className="w-full border-b-2 p-3 bg-secondary-white"
            type="text"
            name="email"
          />
        </div>
        
        <div className="my-6">
          <label className="block mb-2 font-bold">Contraseña</label>
          <input
            className="w-full border-b-2 p-3 bg-secondary-white"
            type="password"
            name="password"
          />
        </div>

        <div className="flex w-full justify-between mb-12">
          <button className="">
            <p className="">
              Restablecer contraseña
            </p>
          </button>
          <button className="w-[135px] h-[35px] bg-primary-blue rounded-lg text-white font-semibold hover:scale-105">
            Iniciar Sesión
          </button>
        </div>

        <hr className="border-t border-gray-300 my-4" /> 

        <div className="grid flex-col w-full justify-center justify-items-center mt-12">
         <button className="h-[50px] rounded-lg border-2 mb-3 pl-2 pr-3 py-2 max-w-80 flex items-center">
           <img className="h-[30px] w-[30px] mr-2" src="/svg/cell-phone-svgrepo-com.svg" alt="PhoneImg"></img>
           <p className="flex justify-center content-center font-bold">
              Continuar con número de teléfono
           </p>
         </button>
         <button className="hover:underline hover:scale-105">
           <p className="font-bold">
             Crear cuenta
           </p>
         </button>
        </div>

      </article>
    </section>
  );
}
