import NavbarLink from "./NavbarLink";
import { CENTER_NAV_LINKS } from "./links";

export default function SidebarContent() {
  return (
    <>
      <section className="sidebar-title justify-end bg-gray-2">
      <hr className="w-full h-[1px]" />
      </section>
      <section className="sidebar-content h-fit min-h-[20rem] overflow-visible">
        <nav className="menu rounded-md">
          <section className="menu-section">
            <ul className="menu-items gap-8">
              {CENTER_NAV_LINKS.map((link) => (
                <NavbarLink
                  key={link.href}
                  title={link.title}
                  href={link.href}
                  src={link.src}
                  alt={link.alt}
                />
              ))}
            </ul>
          </section>
        </nav>
      </section>
      <section className="sidebar-footer h-full justify-end pt-2">
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
