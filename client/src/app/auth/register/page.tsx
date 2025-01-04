"use client";
import { useState } from "react";
import { User } from "./interfaces";
import Form1 from "./Form1";
import { fields } from "./fields";
import { register } from "@/app/api/user";
import Alert from "./Alert";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
      dni: user.dni,
      numberPhone: "+549" + user.numberPhone
    };
  
    try {
      const data = await register(finalUser); 
      if (data.response.status === 400) {
        setWarningMessage(data.response.data.message)
        return
      }
      signIn("credentials", {
        email: finalUser.email,
        password: finalUser.password,
        redirect: true,
        callbackUrl: '/settings'
      });
      
    } catch (error) {
      console.error("Error registering user:", error);
      setWarningMessage("Error al registrar el usuario");
    }
  };

  return (
    <>
      {showAlert && (
        <Alert message={errorMessage} onClose={() => setShowAlert(false)} />
      )}
      <section className="min-h-screen flex justify-around items-center bg-secondary-white">
        <picture className="hidden md:flex justify-around ">
          <img src="/svg/Imagotype.svg" alt="Logotype" />
        </picture>

        <article className="w-[700px] px-12 py-12 bg-secondary-white flex flex-col">
          <section className="flex justify-center items-center flex-col">
            <img className="mb-6 " src="/svg/BIENVENIDO! (1).svg" alt="svg-img" />
            <div className="flex items-center">
              <a href="/auth/login">
                <button className="font-bold text-xl my-6 mr-7 text-secondary-gray pb-2 border-b-4 hover:scale-105 duration-150">
                  Iniciar Sesión
                </button>
              </a>
              <div className="font-bold text-xl my-6 ml-7 pb-2 border-b-4 border-black select-none">
                Registrarse
              </div>
            </div>
          </section>


          <Form1 fields={fields}
            errorMessage={warningMessage}
            user={user}
            handleChange={handleChange}
            onClickFunction={handleSubmit}
          />
        </article>
      </section>
    </>
  );
}
