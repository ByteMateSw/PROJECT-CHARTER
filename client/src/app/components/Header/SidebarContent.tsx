import Link from "next/link";
import Dropdown from "./Dropdown";
import NavbarLink from "./NavbarLink";
import { CENTER_NAV_LINKS } from "./links";
import { signOut } from "next-auth/react";

export default function SidebarContent({ user }: { user: any }) {

  let image = user?.photo || user?.image 
  let name = user?.username || user?.name


  return (
    <>
      <section className="sidebar-content h-fit min-h-[20rem] mt-8 overflow-visible">
        <nav className="menu rounded-md">
          <section className="menu-section">
            <label htmlFor="drawer-left">
              <ul className="menu-items gap-4">
                <NavbarLink
                  key="/"
                  title="Home"
                  href=""
                  src={"/svg/home.svg"}
                  alt="Home"
                />
                {CENTER_NAV_LINKS.map((link) => (
                  <NavbarLink
                    key={link.href}
                    title={link.title}
                    href={link.href}
                    src={link.src}
                    alt={link.alt}
                  />
                ))}
                {!user ? (
                  <NavbarLink
                    key="/auth/login"
                    title="Acceder"
                    href="auth/login"
                    src={"/svg/login-blue.svg"}
                    alt="Acceder"
                  />
                ) : (
                  <li className="-mt-2">
                    <input
                      type="checkbox"
                      id="menu-2"
                      className="menu-toggle"
                    />
                    <label
                      className="menu-item justify-between"
                      htmlFor="menu-2"
                    >
                      <div className="flex gap-2">
                        <img
                          className="h-6 filter-white"
                          src={
                            !image ? "/svg/profile-circle.svg" : image
                          }
                          alt={"Foto de Perfil"}
                        />
                        <span className="font-bold text-base">
                          {name}
                        </span>
                      </div>

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
                      </span>
                    </label>

                    <div className="menu-item-collapse">
                      <div className="min-h-0 bg-secondary-white">
                        <Link
                          href={`/profile/${name}/info`}
                          className="menu-item ml-5 text-sm flex flex-row items-center justify-start gap-1"
                        >
                          <img src="/svg/person.svg" alt="" className="h-4" />{" "}
                          Perfil
                        </Link>
                        <Link
                          href={`/settings/${name}`}
                          tabIndex={-1}
                          className="menu-item ml-5 text-sm flex flex-row items-center justify-start gap-2"
                        >
                          <img
                            src="/svg/settings.svg"
                            alt=""
                            className="h-4 -ml-1"
                          />{" "}
                          Configuración
                        </Link>
                        <button
                        onClick={async () => await signOut({
                          callbackUrl: '/'
                        })}
                          tabIndex={-1}
                          className="menu-item ml-5 text-sm flex flex-row items-center gap-1"
                        >
                          <img
                            src="/svg/logout.svg"
                            alt=""
                            className="h-4 -ml-1"
                          />{" "}
                          Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </label>
          </section>
        </nav>
      </section>
      <section className="sidebar-footer h-full justify-end">
        <ul className="flex flex-col gap-y-4 text-xs cursor-default select-none">
          <li>Desarrollado por ByteMate</li>
          <li>© All rights reserved</li>
          <li>Términos y condiciones</li>
          <li>Privacidad</li>
          <li>contact@conectando.com</li>
          <li>Redes</li>
        </ul>
      </section>
    </>
  );
}
