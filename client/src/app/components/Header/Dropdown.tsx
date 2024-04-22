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

export default function Dropdown() {
  return (
    <div className="dropdown dropdown-hover">
      <label
        className="btn bg-secondary-white my-2 font-semibold text-lg gap-2 p-0"
        tabIndex={0}
      >
        <img
          className="rounded-full h-10 border-2 border-secondary-black"
          src="https://randomuser.me/api/portraits/men/0.jpg"
          alt="Profile Image"
        />
        Furry
        <div className="arrow"></div>
      </label>
      <div className="dropdown-menu dropdown-menu-bottom-left bg-secondary-white -right-8 mt-1 w-44">
        <a className="dropdown-item text-sm">Perfil</a>
        <a tabIndex={-1} className="dropdown-item text-sm">
          Configuración
        </a>
        <div className="dropdown-divider" role="separator"></div>
        <a tabIndex={-1} className="dropdown-item text-sm">
          Cerra Sesión
        </a>
      </div>
    </div>
  );
}
