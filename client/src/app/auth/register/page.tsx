"use client";
import { useState } from "react";
import { User } from "./interfaces";
import Form1 from "./Form1";
import { fields } from "./fields";
import { register } from "@/app/api/user";
import Alert from "./Alert";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import InputField from "@/app/components/auth/register/InputField";
import Link from "next/link";
import GoogleOauth from "../googleOauth";

export default function RegisterPage() {
  const router = useRouter()

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dni: "",
    numberPhone: ""
  });
  const [warningMessage, setWarningMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e: any) => {
    setWarningMessage("");
    setErrorMessage([])
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = async () => {
    if (!user.firstName || !user.lastName || !user.username || !user.email || !user.password || !user.confirmPassword) {


      setWarningMessage("Por favor, complete todos los campos");
      return;
    }
    if (user.password !== user.confirmPassword) {
      setWarningMessage("Las contraseñas no coinciden");
      return;
    }
    const finalUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      // dni: user.dni,
      // numberPhone: "+549" + user.numberPhone
    };

    try {
      const data = await register(finalUser);
      if (data.response.status === 400) {
        setErrorMessage(data.response.data.message)
        return
      }
      signIn("credentials", {
        email: finalUser.email,
        password: finalUser.password,
        redirect: true,
        callbackUrl: `/settings/${user.username}`
      });

    } catch (error) {
      console.error("Error registering user:", error);
      setWarningMessage("Error al registrar el usuario");
    }
  };
console.log(warningMessage)
  return (
    <>
      {showAlert && (
        <Alert message={errorMessage} onClose={() => setShowAlert(false)} />
      )}
      <section className="min-h-screen flex justify-around items-center bg-secondary-lightgray">
        <div className="absolute left-0 top-0 ml-4 mt-4">
          <Link href="/">
            <img src="/svg/conectando-icon.svg" alt="Logo" className="h-10" />
          </Link>
        </div>
        <article className="w-[538px] px-12 py-12 bg-secondary-white shadow-md flex flex-col rounded-3xl">
          <div className="flex w-full justify-center items-center flex-col">
            <h2 className="text-5xl font-extrabold text-primary-blue">¡Bienvenido!</h2>
          </div>

          {fields.map((field, index) => (
            <div key={index} className="my-4 w-full">
              <label
                htmlFor={field.name}
                className="block font-bold text-xl"
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
          <div className="w-full flex flex-col justify-center">
            <div className="text-red-500 w-full flex justify-center">
              {errorMessage && <p>
                <ul>
              {
              errorMessage.map((error) => (
                <li>{error}</li>
              ))
              }
              </ul>
              </p>}
              {/* {warningMessage && <p>{warningMessage}</p>} */}
            </div>
            <button
              id="submit"
              type="submit"
              className=" w-full h-[40px] bg-primary-blue rounded-full text-secondary-white mb-2 hover:scale-105 duration-150 text-lg"
              onClick={handleSubmit}
            >
              Crear cuenta
            </button>
          </div>
          <GoogleOauth check={true} />
          <button className="w-full h-[35px] text-sm cursor-default">
            Al registrarte, aceptas nuestras <Link className="text-primary-blue font-semibold cursor-pointer" href='/terms'>Bases y condiciones de uso</Link>
          </button>
          <button className="w-full h-[35px] text-sm cursor-default">
            Ya tienes una cuenta? <Link className="text-primary-blue font-semibold cursor-pointer" href='/auth/login'>Inicia sesión</Link>
          </button>
          {/* <Form1 fields={fields}
            errorMessage={warningMessage}
            user={user}
            handleChange={handleChange}
            onClickFunction={handleSubmit}
          /> */}
        </article>
      </section>
    </>
  );
}
