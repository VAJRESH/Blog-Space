import Navbar from "./Navbar/Navbar";
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Navbar />
            {children}
        </div>
    )
}
export default Layout;