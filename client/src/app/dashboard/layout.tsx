import { Suspense } from "react";
import Sidebar from "../components/Sidebar";
import Animate from "./template";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback="loading...">
      <div className="h-screen grid grid-cols-layout justify-between gap-x-4 px-4 pb-4">
        {/* Navbar placeholder */}
        <div className="col-span-full h-24"></div>

        {/* Sidebar */}
        <div className="hidden md:block md:col-start-1 md:col-end-2 h-full">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3 h-full w-full overflow-hidden">
          <Animate>
            <section className="h-full w-full flex justify-center flex-wrap overflow-auto delete-scrollbar border rounded-3xl border-secondary-gray">
              {children}
            </section>
          </Animate>
        </div>
      </div>
    </Suspense>
  );
}
