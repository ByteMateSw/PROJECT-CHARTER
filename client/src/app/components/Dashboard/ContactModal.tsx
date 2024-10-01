import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { createNotification } from '@/app/api/notification/index';
import { createHiring } from "@/app/api/hiring";

export default function ContactModal({contractorId, contractedId}: {contractorId: number, contractedId: number}) {

    const [provincies, setProvincies] = useState<any>([])
    const [cities, setCities] = useState<any>([])
  
    const [selectProvince, setSelectProvince] = useState<any>()
    const [selectCities, setSelectCities] = useState<any>()
  
    const [title, setTitle] = useState<string>('')
    const [area, setArea] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [description, setDescription] = useState<string>('')
  
    const { data: session, status }: any = useSession();
  
    let decoded: any
    if (typeof session?.user?.access_token === "string") {
      decoded = jwtDecode(session?.user?.access_token)
    }
  
  
    const handleChange = (setter:any) => (e:any) => {
      e.preventDefault()
      setter(e.target.value)
    }
  
  
    async function handleSubmit(e:any) {
      e.preventDefault()
      try {
        await createHiring(contractorId, contractedId)
        await createNotification(contractedId, contractorId, title, description)
      } catch (error) {
        console.error(error)
      }
    }
  
      return (
          <div>
              <label
                className="btn btn-primary w-full font-extrabold text-lg rounded-full mt-1 mr-4"
                htmlFor={`modal-contact`}
              >
                Contactar
              </label>
              <input className="modal-state" id={`modal-contact`} type="checkbox" />
              <section className="modal">
                <label className="modal-overlay" id={`modal-contact`}></label>
                <article className="modal-content h-full w-[990px] grid grid-rows-10 gap-2 p-10 rounded-[2rem] minimal-scrollbar">
                  <div className="grid row-span-1">
                    <p className="flex justify-center text-3xl font-semibold text-primary-blue">Formulario de Contacto</p>
                  </div>
                  <form action="" onSubmit={handleSubmit}>
                  <div className="grid row-span-1 gap-1 my-2">
                    <label htmlFor="title" className="font-bold text-primary-blue text-xl">Titulo del trabajo</label>
                    <input type="text" 
                    placeholder="Titulo"
                    onChange={handleChange(setTitle)}
                    className="rounded-full border text-black font-normal border-slate-800 pl-4 py-2"
                    />
                  </div>
                  <div className="grid row-span-4 gap-1 my-5">
                    <label htmlFor="area" className="font-bold text-xl text-primary-blue">Descripcion</label>
                      <textarea 
                      className="h-full text-black font-normal resize-none border border-slate-800 rounded-xl p-2" 
                      rows={6} 
                      onChange={handleChange(setDescription)}
                      placeholder="Descripcion"></textarea>
                  </div>
                  <button type="submit" className="w-full">
                  <label
                  className=" btn btn-primary w-full rounded-full m-1"
                  htmlFor={`modal-contact`}
                  >
                    Agregar
                  </label>
                  </button>
                  <label
                  className=" btn btn-primary rounded-full w-full m-1"
                  htmlFor={`modal-contact`}
                  >
                    Cerrar
                  </label>
                  </form>
                </article>
              </section>
          </div>
      )
  }