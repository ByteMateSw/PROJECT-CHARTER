import { useEffect, useState } from "react";
import Select from "react-select";
import { styleComboBox } from "../Sidebar/SidebarStyles";
import { getProvinces, getCities } from "@/app/api/locations";
import { getUserByEmail, getUserByUsername } from "@/app/api/user";
import { getProfessions } from "@/app/api/office";
import { getSocialNetworks } from "@/app/api/social-networks";
import { createPost } from "@/app/api/post";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

export default function AddPostModal() {

  const [provincies, setProvincies] = useState<any>([])
  const [cities, setCities] = useState<any>([])

  const [selectProvince, setSelectProvince] = useState<any>()
  const [selectCities, setSelectCities] = useState<any>()
  const [offices, setOffices] = useState<any>()

  const [title, setTitle] = useState<string>('')
  const [area, setArea] = useState({value: 1, label: ''})
  const [price, setPrice] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [contact, setContact] = useState<string>('')
  const [check, setCheck] = useState<boolean>(false)
  const [mode, setMode] = useState({value: 1, label: 'remoto'})

  const [getUser, setGetUser] = useState<any>()

  const { data: session, status }: any = useSession();

  let decoded: any
  if (typeof session?.user?.access_token === "string") {
    decoded = jwtDecode(session?.user?.access_token)
  }

  const workingMode = [
    { value: 1, label: 'remoto' },
    { value: 2, label: 'presencial' },
    { value: 3, label: 'hibrido' },
  ]

  useEffect(() => {
    async function provinciesData() {
      try {
        const response = await getProvinces()

        let data = []
        for (let i of response){
          const obj = { value: i.id, label: i.name }
          data.push(obj)
        }
        setProvincies(data)
      } catch (error) {
        console.error(error)
      }
    }

    async function getOffices() {
      try {
        const response = await getProfessions()
        let data = []
        for (let i of response){
          const obj = { value: i.id, label: i.name }
          data.push(obj)
        }
        setOffices(data)
      } catch (error) {
        console.error(error)
      }
    }

    getOffices()
    provinciesData()
  },[])

  useEffect(() => {
    async function getUserData(){
      if(decoded != undefined){
        try {
          const response = await getUserByUsername(decoded.user.username)
          setGetUser(response)
        } catch (error) {
          console.error(error)
        }
      } 
    }

    async function getUserDataGoogle(){
      if(true){
        try {
          const response = await getUserByEmail(session?.user?.email)
          setGetUser(response)
        } catch (error) {
          console.error(error)
        }
      } 
    }
    if(session?.user?.provider === "credentials") {
      getUserData()
      return
    } 
    else if (session?.user?.provider === "google") { 
      getUserDataGoogle()
      return
    }
  },[session])

  const handleChange = (setter:any) => (e:any) => {
    e.preventDefault()
    setter(e.target.value)
  }

 async function handleProvinciesChange(selectedOption: any){
  try {
    const response = await getCities(selectedOption.label)
    setSelectProvince(selectedOption)
    let data = []
    for (let i of response){
      const obj = { value: i.id, label: i.name }
      data.push(obj)
    }
    setCities(data)
    setSelectCities(null)
  } catch (error) {
    console.error(error)
  }
}

function handleCitiesChange(selectedOption: any) {
  setSelectCities(selectedOption)
}

function handleContact() {
  setCheck(!check)
  setContact(getUser.numberPhone)
}

async function handleSubmit(e:any) {
  e.preventDefault()
  try {
    await createPost(
      getUser.id,
      title,
      description,
      area.label,
      selectCities.value,
      price/1,
      contact,
      //mode.label,
    )
  } catch (error) {
    console.error(error)
  }
}

if(getUser != undefined) 
  {
    return (
        <div>
            <label
              className="flex justify-center items-center btn btn-primary text-base rounded-full mt-1 mr-4"
              htmlFor={`modal-add`}
            >
              <div className="flex ">
              <p className="text-xl pr-3">+</p>
              <p className="flex justify-center items-center">Publicar vacantes</p>
              </div>
            </label>
            <input className="modal-state" id={`modal-add`} type="checkbox" />
            <section className="modal">
              <label className="modal-overlay" id={`modal-add`}></label>
              <article className="modal-content h-full w-[990px] grid grid-rows-10 gap-1 p-10 rounded-[2rem] minimal-scrollbar">
                <div className="grid row-span-1">
                  <p className="flex justify-center text-3xl font-semibold text-primary-blue">Detalles del trabajo</p>
                </div>
                <form action="" onSubmit={handleSubmit}>
                <div className="grid row-span-1 gap-1 my-2">
                  <label htmlFor="title" className="font-bold text-xl">Titulo del trabajo</label>
                  <input type="text" 
                  placeholder="Titulo"
                  onChange={handleChange(setTitle)}
                  className="rounded-full border border-slate-800 pl-4 py-2"
                  />
                </div>
                <div className="grid row-span-1 gap-1 my-2">
                  <label htmlFor="area" className="font-bold text-xl">Area de trabajo</label>
                  <Select
                    styles={styleComboBox}
                    options={offices}
                    value={area}
                    onChange={(selectOption:any) => setArea(selectOption)}
                    placeholder={'Area'}
                     />
                  {/* <input type="text" 
                  placeholder="Area"
                  onChange={handleChange(setArea)}
                  className="rounded-full border border-slate-800 pl-4 py-2"
                  /> */}
                </div>
                <div className="grid row-span-1 gap-1 my-2">
                  <label htmlFor="precio" className="font-bold text-xl">Precio</label>
                  <input type="number" 
                  placeholder="Precio"
                  onChange={handleChange(setPrice)}
                  className="rounded-full border border-slate-800 px-4 py-2"
                  />
                </div>
                <div className="grid row-span-1 gap-1 my-2">
                  <label htmlFor="contacto" className="font-bold text-xl">Contacto</label>
                  <input type="text"
                  disabled={check}
                  placeholder={check ? getUser.numberPhone : "Contacto"}
                  value={check ? getUser.numberPhone : contact}
                  onChange={handleChange(setContact)}
                  className="rounded-full border border-slate-800 px-4 py-2"
                  />
                  <div className="flex gap-3 mt-3 pl-3">
                  <input type="checkbox"
                  disabled={!(getUser.numberPhone != null)}
                  checked={check} 
                  onChange={handleContact}
                  className="rounded-full cursor-pointer ring-offset-2"
                  />
                  <p>{getUser.numberPhone != null ? 'Usar tu numero de telefono' :
                   'No has configurado tu numero de telefono'}</p>
                  </div>
                </div>
                {/* <label htmlFor="location" className="font-bold text-xl">Modalidad</label>
                <Select
                    styles={styleComboBox}
                    options={workingMode}
                    value={mode}
                    onChange={(selectedOption:any) => setMode(selectedOption)}
                    placeholder={'Modalidad'}
                     /> */}
                <div className="grid row-span-1 gap-1 my-2">
                  <label htmlFor="location" className="font-bold text-xl">Ubicación</label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* <input type="text" 
                    placeholder="Provincia"
                    className="rounded-full border border-slate-800 pl-4 py-2"
                    /> */}
                    <Select
                    styles={styleComboBox}
                    options={provincies}
                    value={selectProvince}
                    onChange={handleProvinciesChange}
                    placeholder={'Provincia'}
                     />
                    <Select 
                    styles={styleComboBox}
                    options={cities}
                    value={selectCities}
                    placeholder={'Ciudad'}
                    onChange={handleCitiesChange}
                    isDisabled={!selectProvince}
                    />
                  </div>
                </div>
                <div className="grid row-span-4 gap-1 my-5">
                  <label htmlFor="area" className="font-bold text-xl">Descripcion</label>
                    <textarea 
                    className="h-full resize-none border border-slate-800 rounded-xl p-2" 
                    rows={6} 
                    onChange={handleChange(setDescription)}
                    placeholder="Descripcion"></textarea>
                </div>
                <button type="submit" className="w-full">
                <label
                className=" btn btn-primary w-full rounded-full m-1"
                htmlFor={`modal-add`}
                >
                  Agregar
                </label>
                </button>
                <label
                className=" btn btn-primary rounded-full w-full m-1"
                htmlFor={`modal-add`}
                >
                  Cerrar
                </label>
                </form>
              </article>
            </section>
        </div>
    )
  }
}