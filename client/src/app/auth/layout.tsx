import Animate from "../../components/animate";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <Animate>{children}
      <div className="bg-cover bg-center" style={{backgroundImage: `url("/img/bg-image.jpg")`}}></div>
      </Animate>
  );
}
