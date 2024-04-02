"use client";
import Link from "next/link";

export default function HireModal({
  user,
  onClose,
}: {
  user: any;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col text-center w-full">
      <img
        src={user.imageBackground}
        alt="Imagen de fondo"
        className="w-full h-40 object-cover rounded-t-2xl"
      />
      <div className="flex justify-center items-center flex-col -mt-20 space-x-4">
        {" "}
        <img
          src={user.imageProfile}
          alt="imagen de perfil"
          className="h-32 w-32 rounded-full bg-secondary-gray border-2 border-secondary-white select-none"
        />
      </div>
      <div className="mx-auto my-4 max-w-96">
        <h3 className="text-bold text-xl font-black text-secondary-black">
          {user.name}
        </h3>
        <p className="text-sm text-secondary-gray w-full">{user.profession}</p>
        <p className="text-left">
          <strong>Ubicación:</strong> {user.location}
        </p>
        <p className="text-left">
          <strong>Descripción:</strong> {user.description}
        </p>
      </div>
      <div className="flex mx-auto gap-4">
        <Link href={`/profile/${user.id}`}>
          <button className="btn bg-primary-green text-secondary-white font-bold">
            Ir al perfil completo
          </button>
        </Link>
      </div>
      <hr className="border-t border-secondary-gray mt-8" />
      <div className="ml-8 flex flex-col flex-1 my-3">
        <label className="flex flex-start flex-1">Lorem ipsum</label>
        <ul className="flex gap-2">
          <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
          <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
          <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
          <li className="h-10 w-10 rounded-lg bg-secondary-gray">.</li>
        </ul>
      </div>
      <hr className="border-t border-secondary-gray" />
      <p className="text-start ml-8 my-5">Lorem ipsum</p>
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="btn bg-primary-blue text-secondary-white w-[430px] mx-4 mb-5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
