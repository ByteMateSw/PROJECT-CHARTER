import { deleteExperience } from "@/app/api/experience"

export default function DeleteModel({id}:{id:number}) {

  const deleteExp = async () => {
    try {
      await deleteExperience(id)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

    return(
        <div>
        <label
          className="btn bg-red-600 text-white text-sm rounded p-2 mt-2"
          htmlFor={`modal-delete`}
        >
          Eliminar
        </label>
        <input className="modal-state" id={`modal-delete`} type="checkbox" />
        <section className="modal">
            <article className="modal-content h-40 w-[990px] grid grid-rows-10 gap-2 p-5 rounded-[2rem] minimal-scrollbar">
            <div className="flex flex-col justify-center items-center gap-3 h-32 w-full">
              <h2 className="text-lg">¿Desea eliminar esta experiencia?</h2>
              <div className="flex justify-center w-full">
                <label
                className=" btn btn-primary rounded-full w-1/3 m-1"
                htmlFor={`modal-delete`}
                onClick={deleteExp}
                >
                  Aceptar
                </label>
                <label
                className=" btn bg-red-600 text-white rounded-full w-1/3 m-1"
                htmlFor={`modal-delete`}
                >
                  Cerrar
                </label>
              </div>
            </div>
            </article>
        </section>
        </div>
    )
}