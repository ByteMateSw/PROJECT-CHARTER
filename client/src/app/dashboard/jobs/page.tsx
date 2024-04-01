import { cardDetails } from "@/json/cards"

export default function JobsPage() {
  return (
    <div className="h-screen w-full flex justify-center flex-wrap p-4 pt-14">
      {cardDetails.map((cards, index) => {
        return(
          <div 
            className="shadow-md p-6 rounded-xl w-72 h-52 m-4"
            key={index}
          >
            <h2 className="text-2xl font-bold mb-2">
              {cards.title}
            </h2>
            <h3 className="text-xl italic mb-4">Subtitle</h3>
            <p className="text-secondary-gray">text</p>
          </div>
        );
      })}
    </div>
  )
}