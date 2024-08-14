"use client";
import { useEffect, useState } from "react";
import { User } from "./interfaces";
import Form1 from "./Form1";
import Form2 from "./Form2";
import { City, Locations, Province } from "@/app/components/Sidebar/hooks/interfaces";
import { getCities, getProvinces } from "@/app/api/locations";
import { fields, fields2 } from "./fields";
import { register } from "@/app/api/user";
import Alert from "./Alert";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {

  const [locations, setLocations] = useState<Locations>({
    provinces: [],
    cities: [],
  });
  const [selected, setSelected] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>('');
  const [province, setProvince] = useState<{ label: string }>({ label: "" });
  const [city, setCity] = useState<{ label: string }>({ label: "" });
  const [viewError, setViewError] = useState([])

  const router = useRouter()

  useEffect(() => {
    getProvinces().then((newProvinces: Province[]) => {
      setLocations((prevState: Locations) => ({
        ...prevState,
        provinces: newProvinces,
      }));
    });
    getCities().then((newCities: City[]) => {
      setLocations((prevState: Locations) => ({
        ...prevState,
        cities: newCities,
      }));
    });
  }, []);

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dni: "",
    numberPhone: "",
  });
  const [warningMessage, setWarningMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [page, setPage] = useState(1);

  const nextPage = () => {
    if(!user.firstName || !user.lastName || !user.username || !user.email || !user.password || !user.confirmPassword) {
      return setWarningMessage("Por favor, complete todos los campos")
    }
    if(user.password != user.confirmPassword){
      return setWarningMessage('Las contraseñas no coincide')
    }
    setPage(2)
  }

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
      console.log(user.name, user.lastName, user.username, user.email, user.password, user.confirmPassword);
      
      setWarningMessage("Por favor, complete todos los campos");
      return;
    }
    if (user.password !== user.confirmPassword) {
      setWarningMessage("Las contraseñas no coinciden");
      return;
    }
    const finalUser = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      dni: "",
      birthday: selected,
      // province: province.label,
      // city: city.label,
      numberPhone: "",
    };

    const data = await register(finalUser);
    // if (data.response.data.message) {
    //   setErrorMessage(data.response.data.message);
    //   setShowAlert(true);
    // }

    console.log(data);
    signIn("credentials", {
      email: finalUser.email,
      password: finalUser.password,
      redirect: false,
    })
    router.push('/')
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

          {page === 1 ?
            <Form1 fields={fields}
              errorMessage={warningMessage}
              user={user}
              handleChange={handleChange}
              onClickFunction={nextPage}
            /> :
            <Form2 fields={fields2}
              errorMessage={warningMessage}
              user={user}
              handleChange={handleChange}
              onClickFunction={() =>
                setPage(1)}
              handleSubmit={handleSubmit}
              locations={locations}
              inputValue={inputValue}
              selected={selected}
              setInputValue={setInputValue}
              setSelected={setSelected}
              city={city}
              province={province}
              setCity={setCity}
              setProvince={setProvince}
            />
          }
        </article>
      </section>
    </>
  );
}
