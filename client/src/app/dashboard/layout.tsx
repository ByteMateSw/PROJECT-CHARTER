import { Suspense } from "react";
import Sidebar from "../components/Sidebar";
import Animate from "./template";
import Filters from "./Filters";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback="loading...">
      <div className="h-screen grid grid-rows-12 grid-cols-layout  ">
        {/* Navbar placeholder */}
        <div className="col-span-full h-16"></div>

        {/* Sidebar */}
        <div className="hidden row-span-12 md:block md:col-start-1 md:col-end-2 h-full -mt-3 border ">
          <nav className="flex h-full w-80 p-6 flex-col items-start flex-1 ">
            <Sidebar />
          </nav>
        </div>
        {/* Drawer Top in Mobile */}
        <div className="block md:hidden col-span-full h-full">
          <Filters />
        </div>
        {/* Main content */}
        <div className="col-span-full row-span-12 md:col-start-2 md:col-end-3 h-full w-full overflow-hidden -mt-3">
          <Animate>
            <section className="relative h-full w-full flex justify-center flex-wrap overflow-auto delete-scrollbar ">
              {children}
            </section>
          </Animate>
        </div>
      </div>
    </Suspense>
  );
}
