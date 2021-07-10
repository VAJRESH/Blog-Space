import Link from "next/link";

const NavLink = ({ pageLink, title, specialClass }) => {
  return (
    <Link href={pageLink}>
      <a className={specialClass}>{title}</a>
    </Link>
  );
};

export default NavLink;
