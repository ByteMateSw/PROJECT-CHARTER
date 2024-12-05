import { useEffect, useState } from "react";
import StarRatingVote from "../StarRating/StarRatingVote";

function AddReviewModal() {

  const [selectedStars, setSelectedStars] = useState(0);

  const handleSubmit = () => {}

  // useEffect(() => {

  // },[])

  console.log(selectedStars)

    return(
        <div>
        <label
          className="btn btn-primary rounded-full mt-1 mr-4"
          htmlFor={`modal-add`}
        >
          Dejar una calificación
        </label>
        <input className="modal-state" id={`modal-add`} type="checkbox" />
        <section className="modal">
          <label className="modal-overlay" id={`modal-add`}></label>
          <article className="modal-content h-3/5 w-[990px] grid grid-rows-10 gap-2 p-10 rounded-[2rem] minimal-scrollbar">
            <div className="grid row-span-1">
              <p className="flex justify-center text-3xl font-semibold text-primary-blue">Deja tu calificación</p>
            </div>
            <form action="" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="area" className="font-bold text-xl">Votos</label>
                <StarRatingVote selectedStars={selectedStars} setSelectedStars={setSelectedStars} />
            </div>
            <div className="grid row-span-4 gap-1 my-5">
              <label htmlFor="area" className="font-bold text-xl">Comentario</label>
                <textarea 
                className="h-full resize-none border border-slate-800 rounded-xl p-2" 
                rows={6} 
                onChange={() => {}}
                placeholder="Comentario"></textarea>
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

export default AddReviewModal;