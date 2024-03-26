export default function page() {
   return (
    <main className="min-h-screen flex justify-center items-center flex-col">
      <section className=" shadow-lg w-80 h-80 items-center flex-col border-2 border-gray-900/5 flex bg-secondary-white px-6 py-8 rounded-lg">
      <h1 className="font-bold text-base ">Registro Ciudad</h1>
      <div className=" w-60 ">
        <article>
          <label className=" mt-3 my-1 mb-2 block"> Ciudad  </label> 
          <div>
          <input className="w-60 h-10 mt-1 mb-5 border-2 border-stone-200 bg-secondary-white text-secondary-gray" type= "text" id="ciudad"
          placeholder="Ingrese el nombre de la ciudad"/>
          </div>
        </article>
        <article className="flex items-center">
          <label className="pr-4">Provincia</label> 
          <div>
          <select className=" rounded-md border-2 shadow-lg border-secondary-gray focus:ring-2 bg-transparent placeholder: elija la opcion">
            <option disabled selected value= ""> Elije la opcion </option>
            <option>Misiones</option>
            <option>Cordoba</option>
          </select>
          </div>
        </article>
      </div>
      <div className="pt-5 my-5 flex items-center justify-between ">
        <button className="w-20 mx-3 border-2 border-transparent bg-secondary-gray  hover:bg-gray-700 rounded-md ">Crear</button>
        <button className="w-20 border-2 border-transparent bg-red-400 hover:bg-red-700 rounded-md">Cancelar</button>
      </div>
      </section>
    </main>
   )
  }


