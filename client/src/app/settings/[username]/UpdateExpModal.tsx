import { useState } from "react"
import { updateExperience } from "@/app/api/experience"

export default function UpdateExpModal({id, userId}:{id: number, userId: number}){

    const [position, setPosition] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [company, setCompany] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')

    const handleFormChange = (seter:any) => (e:any) => {
        e.preventDefault()
        seter(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            const data = {
              ...position && {title: position},
              ...description && {description},
              ...company && {company},
              ...startDate && {startDate},
              ...endDate && {endDate},
              userId
            }
            await updateExperience(id, data)
            //window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div>
        <label
          className="btn bg-primary-blue text-white text-sm rounded p-2 mt-2"
          htmlFor={`modal-update`}
        >
          Editar
        </label>
        <input className="modal-state" id={`modal-update`} type="checkbox" />
        <section className="modal">
          <label className="modal-overlay" id={`modal-update`}></label>
          <article className="modal-content h-full w-[990px] grid grid-rows-10 gap-2 p-10 rounded-[2rem] minimal-scrollbar">
            {/* <div className="grid row-span-1">
              <p className="flex justify-center text-3xl font-semibold text-primary-blue">Detalles del trabajo</p>
            </div> */}
            <form action="" onSubmit={handleSubmit}>
            <div className="grid row-span-1 gap-1 my-2">
              <label htmlFor="title" className="font-bold text-xl">Puesto</label>
              <input type="text" 
              placeholder="puesto"
              onChange={handleFormChange(setPosition)}
              className="rounded-full border border-slate-800 pl-4 py-2"
              />
            </div>
            <div className="grid row-span-1 gap-1 my-2">
              <label htmlFor="area" className="font-bold text-xl">Descripcion</label>
              <input type="text" 
              placeholder="descripcion"
              onChange={handleFormChange(setDescription)}
              className="rounded-full border border-slate-800 pl-4 py-2"
              />
            </div>
            <div className="grid row-span-1 gap-1 my-2">
              <label htmlFor="area" className="font-bold text-xl">Empresa</label>
              <input type="text" 
              placeholder="empresa"
              onChange={handleFormChange(setCompany)}
              className="rounded-full border border-slate-800 pl-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-2 my-4">
              <label className="font-bold">
                Fecha de inicio:
              </label>
              <input
                type="date"
                name="startDate"
                // id={`startDate-${index}`}
                // value={experience.startDate}
                onChange={handleFormChange(setStartDate)}
                className="border rounded p-2"
              />
            </div>
            <div className="flex flex-col gap-2 my-4">
              <label className="font-bold">
                Fecha de finalizacion:
              </label>
              <input
                type="date"
                name="startDate"
                // id={`startDate-${index}`}
                // value={experience.startDate}
                onChange={handleFormChange(setEndDate)}
                className="border rounded p-2"
              />
            </div>
            {startDate === "" || endDate === "" ?
            <span></span>
            :
            new Date(endDate).getTime() - new Date(startDate).getTime() > 0 ?
            <span></span>
            :
            <span className="text-red-600 font-bold">
              La fecha de finalizacion no puede ser menor a la de inicio
            </span>
            }

            <button type="submit" className="w-full">
            <label
            className=" btn btn-primary w-full rounded-full m-1"
            htmlFor={`modal-update`}
            >
              Agregar
            </label>
            </button>
            <label
            className=" btn btn-primary rounded-full w-full m-1"
            htmlFor={`modal-update`}
            >
              Cerrar
            </label>
            </form>
          </article>
        </section>
    </div>
    )
}