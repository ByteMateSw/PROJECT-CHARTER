import { Suspense } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Animate from "./template";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback="loading...">
      <div className="h-screen grid grid-rows-layout grid-cols-layout">
        <div className="row-start-2 row-end-3 col-start-1 col-end-2 fixed h-[90%] mt-20">
          <Sidebar />
        </div>
        <div className="row-start-2 row-end-3 col-start-2 col-end-3 h-[90%] w-[96.8%] mt-20 ml-8 overflow-y-hidden">
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
