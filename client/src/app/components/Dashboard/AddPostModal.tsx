import { useEffect, useState } from "react";
import Select from "react-select";
import { styleComboBox } from "../Sidebar/SidebarStyles";
import { getProvinces, getCities } from "@/app/api/locations";

export default function AddPostModal() {

  const [provincies, setProvincies] = useState<any>([])
  const [cities, setCities] = useState<any>([])

  const [selectProvince, setSelectProvince] = useState<any>()
  const [selectCities, setSelectCities] = useState<any>()


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

    provinciesData()
  },[])

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

  // useEffect(() => {
  //   async function citiesData(id: number){
  //     try {
  //       const response = await getCities(id)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   const id = provincies.id
  //   citiesData(id)
  // },[provincies])


    console.log(provincies)
    console.log(cities)
    return (
        <div>
            <label
              className=" btn btn-primary rounded-full mt-2 mr-4"
              htmlFor={`modal-add`}
            >
              Agregar post
            </label>
            <input className="modal-state" id={`modal-add`} type="checkbox" />
            <section className="modal">
              <label className="modal-overlay" id={`modal-add`}></label>
              <article className="modal-content h-full w-[990px] grid grid-rows-10 gap-4 p-10 rounded-[2rem] minimal-scrollbar">
                <div className="grid row-span-1">
                  <p className="flex justify-center text-3xl font-semibold text-primary-blue">Detalles del trabajo</p>
                </div>
                <form action="">
                <div className="grid row-span-1 gap-1 my-5">
                  <label htmlFor="title" className="font-bold text-xl">Titulo del trabajo</label>
                  <input type="text" 
                  placeholder="Titulo"
                  className="rounded-full border border-slate-800 pl-4 py-2"
                  />
                </div>
                <div className="grid row-span-1 gap-1 my-5">
                  <label htmlFor="area" className="font-bold text-xl">Area de trabajo</label>
                  <input type="text" 
                  placeholder="Area"
                  className="rounded-full border border-slate-800 pl-4 py-2"
                  />
                </div>
                <div className="grid row-span-1 gap-1 my-5">
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
                    rows={9} 
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