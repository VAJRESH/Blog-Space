import Link from "next/link";

const NavLink = ({ pageLink, title, isActive, specialClass }) => {
  return (
    <Link href={pageLink}>
      <a className={`${isActive && 'activeLink'} ${specialClass}`}>{title}</a>
    </Link>
  );
};

export default NavLink;
