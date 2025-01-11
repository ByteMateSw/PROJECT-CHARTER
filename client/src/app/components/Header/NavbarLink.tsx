import Link from "next/link";

/**
 * NavbarLink Component
 * @param {string} title - Link Title
 * @param {string} href - Link Reference
 * @returns {JSX.Element} NavbarLink
 * @description NavbarLink Component
 */
export default function NavbarLink({
  title,
  href,
  src,
  alt,
  bgcolor,
  textcolor,
  extra,
}: {
  title: string;
  href: string;
  src: string;
  alt: string;
  bgcolor?: string;
  textcolor?: string;
  extra?: string;
}): JSX.Element {
  return (
    /*hover:text-primary-blue*/
    <Link className={`menu-toggle flex md:flex-col gap-2 md:gap-0 items-start md:items-center px-4 py-2 border border-secondary-gray rounded-full duration-300 bg-${bgcolor} text-${textcolor} ${extra}`} href={`/${href}`}>
      <li className="font-bold text-base">
        {title}
      </li>
    </Link>
  );
}
