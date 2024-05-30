"use client";
import { useUser } from "@/context/userContext";

export default function page() {
  const [user] = useUser();
  console.log(user);
  return (
    <>
      <section className="flex flex-col justify-center items-start w-full p-4">
        <h2 className="text-xl font-bold pt-2">Acerca de mí</h2>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
        recusandae accusantium vitae explicabo! Ullam delectus magni enim
        necessitatibus, sit ipsa deleniti architecto commodi doloribus
        voluptatum ab. Quae aliquam perspiciatis dolorum.
      </section>
      <section className="flex flex-col justify-center items-start w-full p-4">
        <h2 className="text-xl font-bold pt-2">Experiencia</h2>
        <h3 className="text-base font-semibold">Puesto</h3>
        <span className="text-sm font-normal text-secondary-gray">Empresa</span>
        <h3 className="text-base font-semibold">Puesto</h3>
        <span className="text-sm font-normal text-secondary-gray">Empresa</span>
      </section>
      <section className="flex flex-col justify-center items-start w-full p-4">
        <h2 className="text-xl font-bold pt-2">Habilidades y Conocimiento</h2>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
        recusandae accusantium vitae explicabo! Ullam delectus magni enim
        necessitatibus, sit ipsa deleniti architecto commodi doloribus
        voluptatum ab. Quae aliquam perspiciatis dolorum.
      </section>
    </>
  );
}
