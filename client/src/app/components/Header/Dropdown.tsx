import Link from "next/link";
import { signOut } from "next-auth/react";

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

export default function Dropdown({ user }: { user: any }) {

  let image = user.photo || user.image
  let name = user.username || user.name

  console.log(user)

  return (
    <div className="dropdown dropdown-hover hover:[&>label]:text-primary-blue">
      <label
        className="btn bg-secondary-white my-2 font-semibold text-lg gap-2 p-0 username"
        tabIndex={0}
      >
        {image ? (
          <img
            className="rounded-full h-10 border-2 border-secondary-black"
            src={image}
            alt="Profile Image"
          />
        ) : (
          <img
            className="rounded-full h-10 border-2 border-secondary-black"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRenkUTJ2tnqhmukhJwDsDWnoSXC6apMdbtHPjhRFJjsg&s"
            alt="Profile Image"
          />
        )}
        {name}
        <span className="menu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>{" "}
      </label>
      <div className="dropdown-menu dropdown-menu-bottom-left bg-secondary-white -right-4 mt-2 w-44">
        <Link
          href={`/profile/${name}`}
          className="dropdown-item text-sm flex flex-row items-center justify-start gap-1"
        >
          <img src="/svg/person.svg" alt="" className="h-6" /> Perfil
        </Link>
        <Link
          href="/settings"
          tabIndex={-1}
          className="dropdown-item text-sm flex flex-row items-center justify-start gap-2"
        >
          <img src="/svg/settings.svg" alt="" className="h-6 -ml-1" />{" "}
          Configuración
        </Link>
        <div className="dropdown-divider my-2" role="separator"></div>
        <button
        onClick={async () => await signOut({
          callbackUrl: '/'
        })}
          tabIndex={-1}
          className="dropdown-item text-sm flex flex-row items-center gap-1"
        >
          <img src="/svg/logout.svg" alt="" className="h-6 -ml-1" /> Cerrar
          Sesión
        </button>
      </div>
    </div>
  );
}
