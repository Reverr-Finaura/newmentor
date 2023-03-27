import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import {
//   phnSidebarVisible,
//   selectPhnSidebar,
// } from "../../features/phnSidebarSlice";
// import Chat from "../Chat/Chat";
import styles from "./KnowledgeNavbar.module.css";
import { IoMdMenu } from "react-icons/io";
import { phnSidebarVisible } from "../../features/phnSidebarSlice";
import { useDispatch } from "react-redux";

function KnowledgeNavbar() {
  // const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  return (
    <>
      <navbar className={styles.navbar}>
        {/* <MenuIcon
          onClick={() => dispatch(phnSidebarVisible())}
          
        /> */}
        <IoMdMenu
          className={styles.menuIcon}
          onClick={() => dispatch(phnSidebarVisible())}
        />
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className={styles.logo}>
            <img
              src={"images/Reverr-Logo.png"}
              alt="brand-logo"
              // style={{ marginTop: "5px", width: "80px" }}
            />
          </div>
        </Link>
        {/* <div className={styles.options}>
          <div>
            <img src="./images/bell.svg" alt="" />
          </div>
          <div>
            <img src="./images/question.svg" alt="" />
          </div>
          <div>
            <img src="./images/calender.svg" alt="" />
          </div>
          <div
            onClick={() => {
              dispatch(showChat());
            }}
          >
            <img src="./images/chat.svg" alt="" />
          </div>
          <div>
            <img src="./images/profile.svg" alt="" />
          </div>
        </div> */}
      </navbar>
    </>
  );
}

export default KnowledgeNavbar;
