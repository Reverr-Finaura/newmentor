import React from "react";
import "./Sidebar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import dashL from "../../icons/dash-dark.png";
import knowL from "../../icons/know-light.png";
import mentL from "../../icons/cil_education.png";
import comL from "../../icons/Vector (1).png";
import fundL from "../../icons/funding-light.png";
import { useSelector } from "react-redux";
import { selectPhnSidebar } from "../../features/phnSidebarSlice";
import "animate.css";

const Sidebar = () => {
  const phnSidebar = useSelector(selectPhnSidebar);
  console.log(phnSidebar);
  return (
    <section
      id="sidebar-final"
      className="animate__animated 
      animate__slideInLeft  animate__fast"
      style={{
        display: !phnSidebar && window.innerWidth < 800 ? "none" : "flex",
      }}
    >
      {/* <img className='sidebar-final-brand-logo' src="./images/Frame 6266720.png" alt="brand-logo" /> */}
      <NavLink
        className={({ isActive }) =>
          isActive ? "sidebar_link active" : "sidebar_link"
        }
        to="/dashboard"
      >
        <div className="sidebar-final-icon-name-cont">
          <img className="sidebar-final-icon" src={dashL} alt="icon" />
          <p className="sidebar-final-icon-name">Dashboard</p>
        </div>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "sidebar_link active" : "sidebar_link"
        }
        to="/messages"
      >
        <div className="sidebar-final-icon-name-cont">
          <img className="sidebar-final-icon" src={knowL} alt="icon" />
          <p className="sidebar-final-icon-name">Messages</p>
        </div>
      </NavLink>
      {/* href="https://reverrapp.com/fundingform" target="_blank" */}
      <NavLink
        className={({ isActive }) =>
          isActive ? "sidebar_link active" : "sidebar_link"
        }
        to="/transactions"
      >
        <div className="sidebar-final-icon-name-cont">
          <img
            className="sidebar-final-icon sidebar-final-funding-icon"
            src={fundL}
            alt="icon"
          />
          <p className="sidebar-final-icon-name">Transaction</p>
        </div>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "sidebar_link active" : "sidebar_link"
        }
        to="/calender"
      >
        <div className="sidebar-final-icon-name-cont">
          <img
            className="sidebar-final-icon sidebar-final-mentor-icon"
            src={mentL}
            alt="icon"
          />
          <p className="sidebar-final-icon-name">Calender</p>
        </div>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "sidebar_link active" : "sidebar_link"
        }
        to="/community"
      >
        <div className="sidebar-final-icon-name-cont">
          <img className="sidebar-final-icon" src={comL} alt="icon" />
          <p className="sidebar-final-icon-name">Community</p>
        </div>
      </NavLink>
    </section>
  );
};

export default Sidebar;
