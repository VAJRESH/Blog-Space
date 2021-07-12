import Link from "next/link";

const Anchor = ({ pageLink, title, specialClass }) => {
  return (
    <Link href={pageLink}>
      <a className={`${specialClass}`}>{title}</a>
    </Link>
  );
};

export default Anchor;
