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
}: {
    title: string;
    href: string;
}): JSX.Element {
    return (
        <li className="px-4 py-2 rounded-lg font-bold text-base hover:text-secondary-white hover:bg-primary-blue duration-300">
            <Link href={`/${href}`}>{title}</Link>
        </li>
    );
};