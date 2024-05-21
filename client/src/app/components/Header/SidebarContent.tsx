import NavbarLink from "./NavbarLink";
import { CENTER_NAV_LINKS } from "./links";

export default function SidebarContent() {
  return (
    <>
      <section className="sidebar-content h-fit min-h-[20rem] mt-8 overflow-visible">
        <nav className="menu rounded-md">
          <section className="menu-section">
            <label htmlFor="drawer-left">
              <ul className="menu-items gap-8">
                <NavbarLink
                  key="/"
                  title="Home"
                  href="/"
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
                <NavbarLink
                  key="/auth/login"
                  title="Acceder"
                  href="/auth/login"
                  src={"/svg/login-blue.svg"}
                  alt="Acceder"
                />
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
