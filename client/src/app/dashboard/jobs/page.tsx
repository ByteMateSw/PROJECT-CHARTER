"use client";
import { cardDetails } from "@/data/cards";
import NanoClamp from "nanoclamp";
import Image from "next/image";
import Link from "next/link";

export default function JobsPage() {
  return (
    <article className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cardDetails.map((cards, index) => {
        return (
          <div className="shadow-md p-4 rounded-xl" key={index}>
            <span className="flex md:justify-between min-[1620px]:items-center items-start flex-col-reverse min-[1620px]:flex-row">
              <h2 className="flex-start text-lg text-primary-blue font-bold">
                Necesito cambiar una canilla
              </h2>
              <h6 className="flex-end text-xs text-secondary-gray">
                Publicado hace 17 días
              </h6>
            </span>
            <h4 className="text-sm mb-2 text-secondary-gray">John Doe</h4>
            <NanoClamp
              className="text-secondary-gray"
              is="p"
              lines={3}
              text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                 culpa qui officia deserunt mollit anim id est laborum`}
            />
            <div className="flex items-start flex-col min-[1150px]:justify-between min-[1150px]:items-center min-[1150px]:flex-row mt-4">
              <div className="flex cursor-default select-none">
                <Image
                  src="/svg/location.svg"
                  alt="Location Icon"
                  width={20}
                  height={20}
                />
                <span className="ml-1 text-secondary-gray text-xs font-bold">
                  Ubicación
                </span>
              </div>
              <Link className="btn btn-primary rounded-full h-8" href="/">
                Ver detalles
              </Link>
            </div>
          </div>
        );
      })}
    </article>
  );
}
