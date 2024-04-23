"use client";
import { cardDetails } from "@/data/cards";
import NanoClamp from "nanoclamp";

export default function JobsPage() {
  return (
    <article className="h-full w-full flex justify-center flex-wrap gap-6 p-6">
      {cardDetails.map((cards, index) => {
        return (
          <div className="shadow-md p-6 rounded-xl w-96 h-52" key={index}>
            <h2 className="text-2xl font-bold mb-2">
              Necesito cambiar una canilla
            </h2>
            <h4 className="text-lg mb-2">
              Profesional Necesitado: <i>Plomero</i>
            </h4>
            <NanoClamp
              className="text-secondary-gray"
              is="p"
              lines={3}
              text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                 culpa qui officia deserunt mollit anim id est laborum`}
            />
          </div>
        );
      })}
    </article>
  );
}
