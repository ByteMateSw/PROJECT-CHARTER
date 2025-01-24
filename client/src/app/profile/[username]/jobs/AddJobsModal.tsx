import { useState } from "react"
import { createJob } from "@/app/api/jobs"

export default function AddJobsModal({index, sameUser}:{index?:number, sameUser:boolean}) {
    
    const [image, setImage] = useState()
    const [title, setTitle] = useState()
    
    return(
        <div>
          {sameUser ?
        <label
          className="btn btn-primary rounded-full mt-1 mr-4"
          htmlFor={`modal-${index}`}
        >
          Subir Trabajo
        </label>
          :
          <span></span>
          }
        <input className="modal-state" id={`modal-${index}`} type="checkbox" />
        <section className="modal">
          <label className="modal-overlay" id={`modal-${index}`}></label>
          <article className="modal-content h-1/2 w-[990px] grid grid-rows-10 gap-2 p-10 rounded-[2rem] minimal-scrollbar">
            <div className="grid row-span-1">
              <p className="flex justify-center text-3xl font-semibold text-primary-blue">Mi trabajo</p>
            </div>
            <div className="flex flex-col gap-4">
            <div className="grid row-span-1 gap-1 my-2">
                  <label htmlFor="title" className="font-bold text-xl">Titulo del trabajo</label>
                  <input type="text" 
                  placeholder="Titulo"
                  //onChange={() => console.log()}
                  className="rounded-full border border-slate-800 pl-4 py-2"
                  />
            </div>
                <div className="flex">
                    <picture className="flex justify-center items-center w-72 h-32 px-24 py-5 rounded-3xl bg-secondary-gray/15 cursor-pointer">
                        <label htmlFor="uploadProfileImg">
                            <img
                                className="h-24 w-24 border-2 rounded-full border-secondary-white cursor-pointer"
                                //src={profilePhoto}
                                alt="Imagen de Perfil"
                            />
                        </label>
                    </picture>
                    <label
                        className="ml-6 inline-flex items-center cursor-pointer"
                        htmlFor="uploadProfileImg"
                    >
                        <input
                            type="file"
                            id="uploadProfileImg"
                            className="hidden"
                            //onChange={handleProfilePhotoChange}
                        />
                        Subir Imagen
                    </label>
                </div>
                </div>
            <div className="flex fixed bottom-8 left-1/3">
                <label className="btn btn-primary rounded-full mt-1 mr-4" htmlFor="">
                    Subir
                </label>
            <label
              className="btn btn-primary rounded-full mt-1 mr-4"
              htmlFor={`modal-${index}`}
            >
              Cerrar
            </label>
            </div>
          </article>
        </section>
    </div>
    )
}