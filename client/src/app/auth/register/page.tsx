import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center rounded-lg">
      <h1 className="h-16 mb-4 w-80 flex items-center justify-center bg-secondary-white shadow-xl rounded-lg font-semibold text-2xl">
        Registrarse
      </h1>
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
            placeholder="••••••••••"
          />
        </div>
        <div className="my-6">
          <label className="block mb-2">Confirmar Contraseña</label>
          <input
            className="h-16 w-full rounded-lg p-3 appearance-none border"
            type="password"
            name="confirmPassword"
            placeholder="••••••••••"
          />
        </div>
        <hr className="border-t border-gray-300 my-4" />
        <button className="w-full h-16 bg-primary-blue rounded-lg text-white font-semibold">
          Registrarse
        </button>
        <p className="text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link
            className="text-primary-blue"
            href="/auth/login"
            scroll={false}
          >
            Inicia Sesión
          </Link>
        </p>
      </article>
    </section>
  );
}
