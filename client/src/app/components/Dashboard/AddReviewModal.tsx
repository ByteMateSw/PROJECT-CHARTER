import { useEffect, useState } from "react";
import StarRatingVote from "../StarRating/StarRatingVote";
import ComboBox from "../ComboBox";
import { styleComboBox } from "../Sidebar/SidebarStyles";
import { createReview } from "@/app/api/review";
import { useUser } from "@/context/userContext";

function AddReviewModal({userSession}:{userSession:any}) {

  const [selectedStars, setSelectedStars] = useState(0);
  const [selectOptions, setSelctOptions] = useState<{value: number, label: string, isDisabled: boolean}>();
  const [descriptionCont, setDescriptionCont] = useState<string>('')

  const [user, setUser] = useUser()

  const handleSubmit = async () => {
    if(selectOptions) {
      try {
        await createReview(user?.id, userSession?.id, selectedStars, descriptionCont, selectOptions.label)
      } catch (error) {
        console.error(error)
      }
    }
    }

  console.log(selectedStars)
  console.log(user)
  console.log(userSession)
 
  
  let optionsPost: {id: number | string, name: string}[] = []
  user?.posts.map((post:any) => (
    optionsPost.push({id: post.id, name: post.title})
  ))

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
          <article className="modal-content h-3/5 sm:h-2/3 w-[990px] grid grid-rows-10 gap-2 p-10 rounded-[2rem] minimal-scrollbar">
            <div className="grid row-span-1">
              <p className="flex justify-center text-3xl font-semibold text-primary-blue">Deja tu calificación</p>
            </div>
            <form action="" onSubmit={handleSubmit}>
            <div className="my-5">
              <label htmlFor="area" className="font-bold text-xl">Votos</label>
                <StarRatingVote selectedStars={selectedStars} setSelectedStars={setSelectedStars} />
            </div>
            <div className="my-5">
            <label htmlFor="area" className="font-bold text-xl">Trabajo realizado</label>
            <ComboBox
              optionsProps={optionsPost}
              styles={styleComboBox}
              setSelectedOptions={setSelctOptions}
              selectedOptions={selectOptions}
              placeholder="trabajo"
            />
            </div>
            <div className="grid row-span-4 gap-1 my-5">
              <label htmlFor="area" className="font-bold text-xl">Comentario</label>
                <textarea 
                className="h-full resize-none border border-slate-800 rounded-xl p-2" 
                rows={6} 
                onChange={(e) => setDescriptionCont(e.target.value)}
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