import styles from "./Navbar.module.scss";
import Link from "next/link";
import { APP_NAME } from "../../../config";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navItem}>
        <Link href="/">
          <a className={styles.appName}>{APP_NAME}</a>
        </Link>
      </div>

      <div className={styles.navItem}>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
