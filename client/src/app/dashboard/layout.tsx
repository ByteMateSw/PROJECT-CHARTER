import { Suspense } from "react";
import Sidebar from "../components/Sidebar";
import Animate from "./template";
import Filters from "./Filters";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback="loading...">
      <div className="h-screen grid grid-rows-6 grid-cols-layout justify-between gap-x-4 px-4 pb-4">
        {/* Navbar placeholder */}
        <div className="col-span-full h-24"></div>

        {/* Sidebar */}
        <div className="hidden row-span-5 md:block md:col-start-1 md:col-end-2 h-full">
          <nav className="flex h-full w-80 p-6 flex-col items-start flex-1 border rounded-3xl border-secondary-gray">
            <Sidebar />
          </nav>
        </div>
        {/* Drawer Top in Mobile */}
        <div className="block md:hidden col-span-full h-full">
          <Filters />
        </div>
        {/* Main content */}
        <div className="col-span-full row-span-5 md:col-start-2 md:col-end-3 h-full w-full overflow-hidden">
          <Animate>
            <section className="h-full w-full flex justify-center flex-wrap overflow-auto delete-scrollbar md:border md:rounded-3xl md:border-secondary-gray">
              {children}
            </section>
          </Animate>
        </div>
      </div>
    </Suspense>
  );
}
