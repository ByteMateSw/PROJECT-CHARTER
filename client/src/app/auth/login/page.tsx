import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center rounded-lg">
        <img className="mb-3" src="/svg/conectando-logotype.svg" alt="svgimgg"></img>
      <article className="w-96 px-10 py-12 rounded-lg shadow-xl bg-secondary-white">
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-2xl">Iniciar Sesión</h1>
        </div>
        <div className="my-6">
          <label className="block mb-2">Correo o Celular</label>
          <input
            className="h-16 w-full rounded-lg p-3 appearance-none border"
            type="text"
            name="email"
            placeholder="Correo o Celular"
          />
        </div>
        <div className="my-6">
          <label className="block mb-2">Contraseña</label>
          <input
            className="h-16 w-full rounded-lg p-3 appearance-none border"
            type="password"
            name="password"
            placeholder="*************"
          />
        </div>
        <hr className="border-t border-gray-300 my-4" />
        <button className="w-full h-16 bg-primary-blue rounded-lg text-white font-semibold">
          Iniciar Sesión
        </button>
        <p className="text-center mt-4">
          ¿No tienes cuenta?{" "}
          <Link className="text-primary-blue" href="/auth/register" scroll={false}>
          Regístrate
          </Link>
        </p>
      </article>
    </section>
  );
}
