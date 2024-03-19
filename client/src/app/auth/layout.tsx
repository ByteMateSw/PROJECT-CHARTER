import Animate from "../../components/animate";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <Animate>{children}</Animate>
  );
}
