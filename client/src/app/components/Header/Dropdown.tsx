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
    <div className="dropdown dropdown-hover hover:[&>label]:text-primary-blue">
      <label
        className="btn bg-secondary-white my-2 font-semibold text-lg gap-2 p-0 username"
        tabIndex={0}
      >
        <img
          className="rounded-full h-10 border-2 border-secondary-black"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRenkUTJ2tnqhmukhJwDsDWnoSXC6apMdbtHPjhRFJjsg&s"
          alt="Profile Image"
        />
        Furry
        <div className="arrow"></div>
      </label>
      <div className="dropdown-menu dropdown-menu-bottom-left bg-secondary-white -right-8 mt-1 w-44">
        <Link href="/profile/username" className="dropdown-item text-sm flex flex-row items-center justify-start gap-1">
          <img src="/svg/person.svg" alt="" className="h-6" /> Perfil
        </Link>
        <Link href="#"
          tabIndex={-1}
          className="dropdown-item text-sm flex flex-row items-center justify-start gap-2"
        >
          <img src="/svg/settings.svg" alt="" className="h-6 -ml-1" /> Configuración
        </Link>
        <div className="dropdown-divider my-2" role="separator"></div>
        <Link href="#"
          tabIndex={-1}
          className="dropdown-item text-sm flex flex-row items-center gap-1"
        >
          <img src="/svg/logout.svg" alt="" className="h-6 -ml-1" /> Cerrar Sesión
        </Link>
      </div>
    </div>
  );
}
