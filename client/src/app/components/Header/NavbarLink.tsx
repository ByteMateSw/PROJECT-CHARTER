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
}: {
  title: string;
  href: string;
  src: string;
  alt: string;
}): JSX.Element {
  return (
    <Link className="flex md:flex-col gap-2 md:gap-0 items-start md:items-center px-4 text-secondary-black hover:text-primary-blue duration-300 rounded-lg link" href={`/${href}`}>
      <img className="h-6 filter-white" src={src} alt={alt} />
      <li className="font-bold text-base">
        {title}
      </li>
    </Link>
  );
}
