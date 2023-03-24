import React from "react";
import styles from "./Layout.module.css";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className={styles.main__container}>
      <Navbar />
      <div className={styles.main__content}>
        <Sidebar />
        <div className={styles.main__block}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
