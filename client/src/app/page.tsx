import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BestProfiles from "./components/Home/BestProfile";
import Hero from "./components/Home/Hero";
import Carousel from "./components/Home/Carousel";
import MiniAbout from "./components/Home/MiniAbout";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full flex-col items-center justify-center gap-10 inline-flex">
        <Hero />
        <Carousel />
        <BestProfiles />
        <MiniAbout className="justify-start items-start" />
        <MiniAbout className="justify-end items-end" />
      </main>
      <Footer />
    </>
  );
}
