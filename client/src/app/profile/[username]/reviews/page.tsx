import React from "react";

export default function page() {
  return (
    <section className="flex flex-col justify-center items-start p-4 w-full">
      <h2 className="text-xl font-bold pt-2">Opiniones</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
        recusandae accusantium vitae explicabo! Ullam delectus magni enim
        necessitatibus, sit ipsa deleniti architecto commodi doloribus
        voluptatum ab. Quae aliquam perspiciatis dolorum.
      </p>
      <article className="flex flex-wrap justify-center md:justify-start items-center pt-4 gap-4 w-full">
        <div className="h-auto max-w-96 rounded-[2.5rem] border border-secondary-gray p-4">
          <span className="inline-flex">
            <img
              className="h-10 w-h-10 border-2 border-secondary-black rounded-full mr-2"
              src="/svg/profile-circle.svg"
              alt="Foto de perfil"
            />
            <span className="flex flex-col">
              <label htmlFor="username" className="text-sm font-bold">
                Nombre
              </label>
              <label
                htmlFor="username"
                className="text-secondary-gray text-xs font-normal"
              >
                Hace 1 año
              </label>
            </span>
          </span>
          <span className="w-full inline-flex">
            {[0, 1, 2, 3, 4].map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <img
                    src="/svg/star.svg"
                    alt="image"
                    className="inline h-w-4 w-4"
                  />
                </React.Fragment>
              );
            })}
            <p className="text-secondary-black text-sm">4.5</p>
            <p className="ml-2 text-primary-blue text-sm">Titulo del trabajo</p>
          </span>
          <p className="text-sm font-normal">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
            labore nisi vel, temporibus ullam voluptate dignissimos facilis esse
            blanditiis ipsam distinctio sunt nesciunt eos mollitia rerum
            consequatur. Repellat, id odio.
          </p>
        </div>
      </article>
    </section>
  );
}
