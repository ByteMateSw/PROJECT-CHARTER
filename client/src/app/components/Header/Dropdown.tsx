import Link from "next/link";

function Menu({ href, text }: { href: string; text: string }): JSX.Element {
  return (
    <Link
      href={href}
      className="block px-4 py-3 text-sm text-secondary-black hover:bg-secondary-gray/55 rounded-md"
      role="menuitem"
    >
      svg {text}
    </Link>
  );
}

const MENU_ITEMS = [
  { href: "#", text: "Perfil" },
  { href: "#", text: "Configuración" },
];

export default function Dropdown({ isOpen }: { isOpen: boolean}) {
  return (
    <div
      className={`absolute -left-5 mt-4 w-36 rounded-md shadow-lg bg-secondary-white ring-1 ring-black ring-opacity-5 dropdown-content ${
        isOpen ? "open" : ""
      }`}
    >
      <div
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {MENU_ITEMS.map((item) => {
          return <Menu key={item.text} href={item.href} text={item.text} />;
        })}
        <hr />
        <Menu href="/logout" text="Cerrar Sesión" />
      </div>
    </div>
  );
}
