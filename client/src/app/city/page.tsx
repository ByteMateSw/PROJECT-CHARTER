export default function page() {
   return (
    <main className="min-h-screen flex justify-center items-center flex-col">
      <section className=" w-80 h-80 items-center flex-col border-2 border-gray-900/5 flex bg-zinc-200/15 px-6 py-8 rounded-lg">
      <h1 className="font-bold text-base ">Registro Ciudad</h1>
      <div className=" w-60 ">
        <article>
          <label className=" mt-9 my-1 mb-2 block"> Ciudad  </label> 
          <div>
          <input className="w-60 mt-3 mb-5 border-0 bg-gray-100 text-slate-500" type= "text" id="ciudad"
          placeholder="Ingrese el nombre de la ciudad"/>
          </div>
        </article>
        <article className="flex items-center">
          <label className="pr-4">Provincia</label> 
          <select className=" rounded-md border-2 border-b-gray-500 focus:ring-2 bg-transparent placeholder: elija la opcion">
            <option disabled selected value= ""> Elije la opcion </option>
            <option>Misiones</option>
            <option>Cordoba</option>
          </select>
        </article>
      </div>
      <div className="pt-5 my-5 flex items-center justify-between ">
        <button className="w-20 mx-3 border-2 border-transparent bg-gray-300  hover:bg-gray-700 rounded-md ">Crear</button>
        <button className="w-20 border-2 border-transparent bg-red-400 hover:bg-red-700 rounded-md">Cancelar</button>
      </div>
      </section>
    </main>
   )
  }


