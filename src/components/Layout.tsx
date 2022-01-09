import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import styles from "./Layout.module.css";
import { FilesList } from "./FilesList";

export const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <FilesList />
      <div>
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};
