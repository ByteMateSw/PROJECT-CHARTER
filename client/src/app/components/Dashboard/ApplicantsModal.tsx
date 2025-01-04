import React from "react"
import Link from "next/link";

export default function AplicantsModal({index, applicants, sameUser}:{index: number, applicants: any, sameUser: boolean}) {

  console.log(sameUser)
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
            <div className="grid row-span-8 ">
            {applicants?.map((apply:any) => (
                <Link key={apply.id} href={`/profile/${apply.username}/info`} >
                    <div className="grid row-span-1 cursor-pointer place-content-center shadow-md border font-bold text-primary-blue h-12 w-full rounded-md">
                        {`${apply.firstName} ${apply.lastName}`}
                    </div>
                </Link>
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