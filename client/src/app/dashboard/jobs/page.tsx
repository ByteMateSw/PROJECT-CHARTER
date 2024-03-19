import { cardDetails } from "@/json/cards"

export default function JobsPage() {
  return (
    <div className="h-screen w-full flex justify-center flex-wrap">
      {cardDetails.map((cards) => {
        return(
          <div className="bg-se shadow-md p-6 rounded-xl w-30 h-13 flex-shrink-0"
          key={cards.title}
          >
           
          <h2 className="text-2xl font-bold mb-2">
            {cards.title}
          </h2>
          <h3 className="text-xl italic mb-4">Subtitle</h3>
          <p className="text-gray-700"> texxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxt</p>

      </div>
        
        
        );
      })}


      
</div>
  )
    }