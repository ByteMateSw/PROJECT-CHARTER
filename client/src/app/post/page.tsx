export default function page() {
  return (
    <main className="min-h-screen flex justify-center items-center flex-col">
      <section className="px-4 py-4 w-96 h-96 bg-white flex items-center flex-col border-2 border-black rounded-md shadow-2xl">
        <h1 className="font-bold">Crear una publicación</h1>
        <div>
          <article className="px-6 py-4 justify-start">
            <label className=" block mb-2">Título</label>
            <input className="border-black rounded-md border-3 h-10 w-full pl-2 bg-gray-200" type="text" placeholder="Mi canilla necesita arreglo..."/>
          </article>
          <article className="px-6 py-2 justify-start">
            <label className="block mb-2">Descripción</label>
            <textarea className="w-full px-3 py-3 mb-2 rounded-md block border-black bg-gray-200" placeholder="A mi canilla se le salio la llave de arriba..."/>
            <input type="file" />
          </article>
        </div>
        <div className="w-full pt-3 flex justify-end"> 
          <button className="border-1 border-black mr-3 bg-gray-200 w-24 h-10 rounded-md">Cancelar</button>
          <button className="bg-blue-500 text-white rounded-md w-24 h-10">Publicar</button> 
        </div>
      </section>
    </main>
  );
}

