import React, { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import KnowledgeNavbar from "../components/KnowledgeNavbar/KnowledgeNavbar";

const Layout = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className={styles.main__container}>
      {width >= 800 ? <Navbar /> : <KnowledgeNavbar />}
      <div className={styles.main__content}>
        <Sidebar />
        <div className={styles.main__block}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
