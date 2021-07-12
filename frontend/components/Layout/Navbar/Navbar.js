import { useRouter } from "next/router";
import { isAuth } from "../../../actions/auth.action";
import { APP_NAME } from "../../../config";
import Logout from "../../Auth/Logout/Logout";
import ToastMessage from "../../ToastMessage/ToastMessage";
import styles from "./Navbar.module.scss";
import NavLink from "./NavLink";
import useHandleNav from "./NavLogic";

const Navbar = () => {
  const { handleClick, handleLogout, response, isUserLoggedIn } =
    useHandleNav();

  const router = useRouter();

  return (
    <>
      <ToastMessage type={response.type} message={response.message} />
      <nav className={styles.navbar} onClick={handleClick}>
        {/* app name and logo */}
        <div className={styles.navItem}>
          <NavLink
            pageLink="/"
            isActive={router.pathname === "/"}
            specialClass={styles.appName}
            title={APP_NAME}
          />
        </div>
        {/* if user is not logged in */}
        {!isUserLoggedIn && (
          <div className={styles.navItem}>
            <NavLink
              pageLink="/login"
              title="Login"
              isActive={router.pathname === "/login"}
            />
            <NavLink
              pageLink="/register"
              title="Register"
              isActive={router.pathname === "/register"}
            />
          </div>
        )}

        {/* after user is logged in */}
        {isUserLoggedIn && (
          <div className={styles.navItem}>
            {isAuth().role === 0 && (
              <NavLink
                pageLink="/user"
                isActive={router.pathname === "/user"}
                title={`${isAuth().name}'s dashboard`}
              />
            )}
            {isAuth().role === 1 && (
              <NavLink
                pageLink="/admin"
                isActive={router.pathname === "/admin"}
                title={`Admin's dashboard`}
              />
            )}
            <Logout handleLogout={handleLogout} />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
