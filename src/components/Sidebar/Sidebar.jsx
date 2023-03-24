import React from "react";
import "./Sidebar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import dashL from "../../icons/dash-dark.png";
import knowL from "../../icons/know-light.png";
import mentL from "../../icons/cil_education.png";
import comL from "../../icons/Vector (1).png";
import fundL from "../../icons/funding-light.png";

const Sidebar = () => {
  return (
    <section id="sidebar-final">
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
        to="/knowledge"
      >
        <div className="sidebar-final-icon-name-cont">
          <img className="sidebar-final-icon" src={knowL} alt="icon" />
          <p className="sidebar-final-icon-name">Knowledge</p>
        </div>
      </NavLink>
      {/* href="https://reverrapp.com/fundingform" target="_blank" */}
      <NavLink
        className={({ isActive }) =>
          isActive ? "sidebar_link active" : "sidebar_link"
        }
        to="/funding-page"
      >
        <div className="sidebar-final-icon-name-cont">
          <img
            className="sidebar-final-icon sidebar-final-funding-icon"
            src={fundL}
            alt="icon"
          />
          <p className="sidebar-final-icon-name">Funding</p>
        </div>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "sidebar_link active" : "sidebar_link"
        }
        to="/mentors"
      >
        <div className="sidebar-final-icon-name-cont">
          <img
            className="sidebar-final-icon sidebar-final-mentor-icon"
            src={mentL}
            alt="icon"
          />
          <p className="sidebar-final-icon-name">Mentorship</p>
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
