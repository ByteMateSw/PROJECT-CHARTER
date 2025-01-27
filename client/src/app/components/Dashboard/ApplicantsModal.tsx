import React from "react"
import Link from "next/link";

export default function AplicantsModal({index, applicants, sameUser}:{index: number, applicants: any, sameUser: boolean}) {

    console.log(applicants)  
    return(
        <div>
          {sameUser ?
        <label
          className="btn btn-primary rounded-full mt-1 mr-4"
          htmlFor={`modal-${index}`}
        >
          Aplicantes
        </label>
          :
          <span></span>
          }
        <input className="modal-state" id={`modal-${index}`} type="checkbox" />
        <section className="modal">
          <label className="modal-overlay" id={`modal-${index}`}></label>
          <article className="modal-content h-full w-[990px] grid grid-rows-10 gap-2 p-10 rounded-[2rem] minimal-scrollbar">
            <div className="grid row-span-1">
              <p className="flex justify-center text-3xl font-semibold text-primary-blue">Aplicantes</p>
            </div>
            <div className="grid grid-cols-2 gap-2 row-span-8 ">
            {applicants?.map((apply:any) => (
                  <div key={apply.id} className="grid row-span-1 place-content-center shadow-md border font-bold text-primary-blue h-36 w-full rounded-md">
                    {/* <Link key={apply.id} href={`/profile/${apply.username}/info`} > */}
                    <div className="flex flex-col justify-center">
                        <div className="h-14 flex justify-center">
                          <img src={apply.photo} alt="" className="h-14 w-14" />
                        </div>
                        <p className="flex justify-center">{`${apply.firstName} ${apply.lastName}`}</p>
                        <div className="flex text-white h-9 gap-2 mt-2">
                          <button className="bg-gray-400 px-3 text-sm rounded-full">
                            <a href={`/profile/${apply.username}/info`} target="_blank">Ver perfil</a>
                          </button>
                          {/* <button className="bg-primary-blue px-3 text-sm rounded-full">
                            Contratar
                          </button> */}
                        </div>
                    </div>
                    {/* </Link> */}
                  </div>
            ))}
            </div>
            <div className="grid row-span-1 place-content-center">
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