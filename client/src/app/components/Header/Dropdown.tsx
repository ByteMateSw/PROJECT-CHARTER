import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

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

  const { data: session, status }: any = useSession();

  //let usernameForId = user?.email.split('@')[0]
  let image = user?.photo || user?.image || session.user.imagev || "/svg/avatar.svg"
  let name = user?.username || user?.name

  return (
    <div className="dropdown hover:[&>label]:text-primary-blue">
      <label
        className="btn bg-secondary-white my-2 font-semibold text-lg gap-1 p-0 username"
        tabIndex={0}
      >
        <img
          className="rounded-full h-10 w-10 border-2 border-secondary-gray"
          src={image ? image : "/svg/avatar.svg"}
          alt="Profile Image"
        />
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
      <div className="dropdown-menu dropdown-menu-bottom-left bg-secondary-white w-52 rounded-none rounded-b-lg p-0">
        <div className="py-2 flex flex-col items-center justify-center">
          <span className="flex items-center justify-center flex-col">
            <img className="h-20 w-20 shadow-md rounded-full" src={image} alt="Avatar" />
            <span className="text-sm pt-2 text-secondary-black font-bold">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-secondary-gray font-normal">
              @{name}
            </span>
          </span>
        </div>
        <hr className="w-full pt-2" />
        <div className="flex flex-col w-full gap-1">
          <a
            href={`/profile/${name}/info`}
            className="text-sm flex items-center hover:bg-[#E9EEFC] rounded-none px-2"
          >
            <span className="flex justify-center items-center">
              <img
                src="/svg/person.svg"
                alt=""
                className="h-6 w-6 flex-shrink-0"
              />
            </span>
            <span className="ml-2">Perfil</span>
          </a>
          <a
            href={`/settings/${name}`}
            tabIndex={-1}
            className="text-sm flex items-center hover:bg-[#E9EEFC] rounded-none px-2"
          >
            <span className="flex justify-center items-center">
              <img
                src="/svg/settings.svg"
                alt=""
                className="h-6 w-6 flex-shrink-0"
              />
            </span>
            <span className="ml-2">Configuración</span>
          </a>
        </div>
        <hr className="w-full my-2" />
        <button
          onClick={async () => await signOut({
            callbackUrl: '/'
          })}
          tabIndex={-1}
          className="text-sm flex items-center hover:bg-[#E9EEFC] rounded-none px-2 mb-2"
        >
          <span className="flex justify-center items-center">
              <img
                src="/svg/logout.svg"
                alt=""
                className="h-4 w-4 flex-shrink-0"
              />
            </span>
            <span className="ml-2">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}
