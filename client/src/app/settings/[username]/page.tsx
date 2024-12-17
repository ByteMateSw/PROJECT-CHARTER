"use client";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { fields, redes } from "./fields";
import { useEffect, useState } from "react";
import { getCities, getProvinces, updateCityUserByName } from "../../api/locations";
import { StylesConfig } from "react-select";
import { getProfessions } from "../../api/office";
import { getUserByUsername, updateUser, getUserByEmail } from "../../api/user";
import { createExperience } from "@/app/api/experience";
import { updateSocialNetworks, getSocialNetworks, createSocialNetwork } from "@/app/api/social-networks";
import SocialMedia from "./SocialMedia";
import About from "./About";
import Images from "./Images";
import Sidebar from "./Sidebar";
import { useSpring, animated } from "react-spring";

const styleComboBox: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#FBFCFF",
    color: "#97989B",
    borderWidth: "1px",
    padding: "0.2rem",
    margin: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: "#97989B",
    borderRadius: "1.5rem",
    appearance: "none",
    width: "100%",
    height: "3rem",
  }),
};

export default function Page({params}: { params: {username: string}}) {
  const { data: session, status }: any = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [user, setUser] = useState<any>({
    firstName: "",
    lastName: "",
    username: "",
    dni: "",
    email: "",
    numberPhone: "",
    experience: [],
    isWorker: false,
    about: "",
    habilities: "",
    instagram: "",
    twitter: "",
    facebook: "",
    linkedin: ""
  });
  const [comboBoxOptions, setComboBoxOptions] = useState<any>({
    provinces: [],
    cities: [],
    offices: [],
  });
  const [province, setProvince] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  const [offices, setOffices] = useState<any>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [getUser, setGetUser] = useState<any>()
  const [socialNet, setSocialNet] = useState()
  

  // Animations using react-spring
  const [styles, api] = useSpring(() => ({
    transform: "translateY(100%)",
    opacity: 0,
  }));


    let decoded: any
    if (typeof session?.user?.access_token === "string") {
      decoded = jwtDecode(session?.user?.access_token)
      const {username, email, city} = decoded.user;
      const finalUsername = username || email.split("@")[0];
      

      //getUserByUsername(finalUsername).then(setUserData);
    }
 
  useEffect(() => {
    const fetchLocations = async () => {
      const [newProvinces, newOffices] = await Promise.all([
        getProvinces(),
        getProfessions(),
      ]);

      setComboBoxOptions((prevOptions: any) => ({
        ...prevOptions,
        provinces: newProvinces,
        offices: newOffices,
      }));
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    
    const fetchSocialNetworks = async (id: number) => {
      const response = await getSocialNetworks(id)
      setSocialNet(response)
    }
    
    // const fetchUser = async () => {
    //   try {
    //     const response = await getUserByUsername(params.username)
    //     setGetUser(response)
    //     fetchSocialNetworks(response.id)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }
    // fetchUser()

    async function getUserDataGoogle(){
      if(true){
        try {
          const response = await getUserByEmail(session?.user?.email)
          setGetUser(response)
          fetchSocialNetworks(response.id)
        } catch (error) {
          console.error(error)
        }
      } 
    }


    if(session?.user?.provider === "credentials") {
      if (decoded != undefined) {
        getUserByEmail(decoded.user.email).then((res) => setGetUser(res)).catch((e) => console.log(e))
        
        fetchSocialNetworks(decoded.user.id)
        return
      }
    } 
    getUserDataGoogle()
  },[session])


  const handleProvinceChange = async (selectedProvince: any) => {
    setProvince(selectedProvince);
    setCity(null); // Resetea la ciudad seleccionada cuando cambia la provincia

    if (selectedProvince) {
      const newCities = await getCities(selectedProvince.label);
      setComboBoxOptions((prevOptions: any) => ({
        ...prevOptions,
        cities: newCities,
      }));
    } else {
      setComboBoxOptions((prevOptions: any) => ({
        ...prevOptions,
        cities: [],
      }));
    }

    setHasChanges(true);
    api.start({ transform: "translateY(0%)", opacity: 1 });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      [name]: value,
    }));

    // Check for changes and update hasChanges
    if (value !== userData?.[name]) {
      setHasChanges(true);
      api.start({ transform: "translateY(0%)", opacity: 1 });
    } else if (!Object.keys(user).some(key => user[key] !== userData?.[key])) {
      setHasChanges(false);
      api.start({ transform: "translateY(100%)", opacity: 0 });
    }
  };


  

  const handleUpdateUser = async () => {
    try {
      // Verificar si todos los campos relevantes están llenos
      if (
        (user.firstName ||
          user.lastName ||
          user.username ||
          user.email ||
          user.numberPhone ||
          user.dni ||
          user.about ||
          user.habilities ||
          user.instagram || 
          user.twitter ||
          user.facebook || 
          user.linkedin) && (
          user.firstName.length > 0 ||
          user.lastName.length > 0 ||
          user.username.length > 0 ||
          user.email.length > 0 ||
          user.numberPhone.length > 0 ||
          user.dni.length > 0 ||
          user.about.length > 0 ||
          user.habilities.length > 0 ||
          user.instagram.length > 0 ||
          user.twitter.length > 0 ||
          user.facebook.length > 0 ||
          user.linkedin.length > 0
        ) || user.isWorker === true
      ) {
        const updatedUserData = {
          ...(user.firstName && { firstName: user.firstName }),
          ...(user.lastName && { lastName: user.lastName }),
          ...(user.username && { username: user.username }),
          ...(user.email && { email: user.email }),
          ...(user.numberPhone && { numberPhone: user.numberPhone }),
          ...(user.dni && { dni: user.dni }),
          ...(user.isWorker && { isWorker: user.isWorker }),
          ...(user.about && { about: user.about }),
          ...(user.habilities && { habilities: user.habilities })
        };

        const updateSocialNetworkData = {
          ...(user.instagram && { instagram: user.instagram }),
          ...(user.twitter && { twitter: user.twitter }),
          ...(user.facebook && { facebook: user.facebook }),
          ...(user.linkedin && { linkedin: user.linkedin })
        }
        // Actualizar la información básica del usuario solo si todos los campos están llenos
        if (Object.keys(updatedUserData).length > 0) {
          await updateUser(getUser?.id, updatedUserData);
        }

        // Actualizar la informacion de las redes sociales del usuario
        if(socialNet) {
          await updateSocialNetworks(getUser?.id, updateSocialNetworkData)
        }
        else await createSocialNetwork({
          userId: getUser.id,
          ...updateSocialNetworkData
        })
      }

      // Verificar si hubo cambios en la ciudad y actualizar la relación con el usuario
      if (city != null) {
        await updateUser(getUser.id, {city: city.label});
      }

      if (user.experience.length > 0) {
        user.experience.map(async (exp:any) => (
          await createExperience(
            exp.position,
            exp.description,
            exp.company,
            exp.startDate,
            exp.endDate,
            getUser?.id
          )
        ))
      }

      // Recargar la página después de la actualización
      window.location.reload();

    } catch (error) {
      console.error("Error actualizando el usuario:", error);
    }
  };

  const handleCancel = () => {
    setUser({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      dni: "",
      numberPhone: "",
      offices: [],
      experience: [],
      isWorker: false,
      habilities: "",
      about: "",
      instagram: "",
      twitter: "",
      facebook: "",
      linkedin: ""
    });
    setProvince(null);
    setCity(null);
    setHasChanges(false);
    api.start({ transform: "translateY(100%)", opacity: 0 });
  };

  const handleRemoveOffice = (officeId: number) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      offices: prevUser.offices.filter((office: any) => office.id !== officeId),
    }));
    setHasChanges(true);
    api.start({ transform: "translateY(0%)", opacity: 1 });
  };

  const handleChangeOffices = (selectedOptions: any) => {
    const newOffices = selectedOptions.filter(
      (option: any) =>
        !user.offices.some((office: any) => office.id === option.value)
    );

    setUser((prevUser: any) => ({
      ...prevUser,
      offices: [
        ...prevUser.offices,
        ...newOffices.map((option: any) => ({
          id: option.value,
          name: option.label,
        })),
      ],
    }));

    setOffices(selectedOptions);
    setHasChanges(true);
    api.start({ transform: "translateY(0%)", opacity: 1 });
  };

  const handleSaveExperience = (experience: any) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      experience: [...prevUser.experience, experience] /*prevUser.experience.map((exp: any) => [1,4]*/
        // exp.id === experience.id ? experience : exp
      //),
    }));
    setHasChanges(true);
    api.start({ transform: "translateY(0%)", opacity: 1 });
  };

  const handleDeleteExperience = (experienceId: number) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      experience: prevUser.experience.filter((exp: any) => exp.id !== experienceId),
    }));
    setHasChanges(true);
    api.start({ transform: "translateY(0%)", opacity: 1 });
  };

  const handleToggleIsWorker = () => {
    setUser((prevUser: any) => ({
      ...prevUser,
      isWorker: !prevUser.isWorker,
    }));
    setHasChanges(true);
    api.start({ transform: "translateY(0%)", opacity: 1 });
  };
console.log(user)
console.log(city != null)

  if (status === "loading") {
    return (
      <div className="h-screen w-full grid grid-rows-layout grid-cols-3 gap-x-4 pb-4 md:px-4">
        <div className="col-span-3 h-24 flex-shrink-0" />
        <div className="h-full col-span-3 flex items-center justify-center skeleton">
          <h1 className="text-2xl font-bold">
            Aguarde un momento <br /> Estamos cargando tu información...
          </h1>
        </div>
      </div>
    );
  }


  if (status === "authenticated" && user) {
    
    return (
      <div className="h-screen grid grid-rows-layout grid-cols-3 gap-x-4 pb-4 md:px-4">
        {/* Navbar placeholder */}
        <div className="col-span-3 h-24 flex-shrink-0"></div>

        {/* Sidebar */}
        <div className="h-full col-span-1 pl-20 pt-16">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="col-span-2">
          {/* Sección de selección de imagen */}
          <Images user={user} userData={getUser} />
          {/* Sección de selección básica */}
          <About
            fields={fields}
            userData={getUser}
            comboBoxOptions={comboBoxOptions}
            styleComboBox={styleComboBox}
            province={province}
            setProvince={handleProvinceChange} // Cambiado para manejar el cambio de provincia
            city={city}
            setCity={setCity}
            user={user}
            offices={offices}
            handleChange={handleChange}
            handleChangeOffices={handleChangeOffices}
            handleRemoveOffice={handleRemoveOffice}
            handleSaveExperience={handleSaveExperience}
            handleDeleteExperience={handleDeleteExperience}
            handleToggleIsWorker={handleToggleIsWorker}
          />
          {/* Redes de Contacto */}
          <SocialMedia redes={redes} user={user} handleChange={handleChange} />
          {/* Botones flotantes */}
          {hasChanges && (
            <animated.div
              style={styles}
              className="fixed bottom-4 right-4 flex space-x-4"
            >
              <button
                onClick={handleUpdateUser}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700"
              >
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-700"
              >
                Cancelar
              </button>
            </animated.div>
          )}
        </div>
      </div>
    );
  }

  return null;
}