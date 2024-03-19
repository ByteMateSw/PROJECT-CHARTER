import Header from "../ui/Header/Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className="fixed w-full z-10">
      <Header />
    </div>
      <div className="flex">
        <div className="w-80 fixed h-full overflow-auto  mt-14">
          <Sidebar />
        </div>
        <div className="flex-grow ml-80 mt-6">
          {children}
        </div>
      </div>
    </>
  );
}