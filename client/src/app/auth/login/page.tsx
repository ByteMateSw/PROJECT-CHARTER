import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center rounded-lg">
      <h1 className="h-16 mb-4 w-80 flex items-center justify-center shadow-xl bg-secondary-white rounded-lg font-semibold text-2xl">Iniciar Sesión</h1>
      <article className="w-96 p-8 rounded-lg shadow-xl bg-secondary-white">
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
