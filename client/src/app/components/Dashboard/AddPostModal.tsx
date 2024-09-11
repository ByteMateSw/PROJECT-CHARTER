

export default function AddPostModal() {



    return (
        <div>
            <label
              className=" btn btn-primary rounded-full m-1"
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
                  <div className="flex gap-2">
                    <input type="text" 
                    placeholder="Provincia"
                    className="rounded-full border border-slate-800 pl-4 py-2"
                    />
                    <input type="text" 
                    placeholder="Localidad"
                    className="rounded-full border border-slate-800 pl-4 py-2"
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