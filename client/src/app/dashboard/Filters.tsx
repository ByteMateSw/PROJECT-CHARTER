import Sidebar from "../components/Sidebar";

export default function Filters() {
  return (
    <>
      <input type="checkbox" id="drawer-top" className="drawer-toggle" />

      <label
        htmlFor="drawer-top"
        className=" inline-flex w-full justify-between"
      >
        <span className="flex">
          <img className="mr-2" src="/svg/sort.svg" alt="Filtrar" />
          Filtros
        </span>
        <img src="/svg/arrow-expand.svg" alt="Expandir..." />
      </label>
      <label className="overlay" htmlFor="drawer-top"></label>
      <div className="drawer drawer-top h-full">
        <div className="drawer-content h-full overflow-hidden">
          <label
            htmlFor="drawer-top"
            className=" inline-flex w-full justify-between"
          >
            <span className="flex">
              <img className="mr-2" src="/svg/sort.svg" alt="Filtrar" />
              Filtros
            </span>
            <img src="/svg/arrow-expand-less.svg" alt="Retraer..." />
          </label>
          <nav className="flex h-full p-6 flex-col items-start flex-1 ">
            <Sidebar />
          </nav>
        </div>
      </div>
    </>
  );
}
