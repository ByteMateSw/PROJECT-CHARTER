import Link from "next/link";
import React from "react";

export default function JobsModal(/*{
  post,
  index,
}: {
  post: any;
  index: number;
}*/) {
  return (
    <div>
    <label
      className=" btn btn-primary rounded-full"
      htmlFor={`modal-${1}`}
    >
      Ver detalles
    </label>
    <input className="modal-state" id={`modal-${1}`} type="checkbox" />
    <section className="modal">
      <label className="modal-overlay" htmlFor={`modal-${1}`}></label>
      <article className="modal-content h-full w-[990px] flex flex-col justify- items-center gap-5 p-10 rounded-[2rem] minimal-scrollbar">
        <div>Jobs</div>
        <div>Jobs</div>
        <div>Jobs</div>
      </article>
    </section>
  </div>
  );
}
