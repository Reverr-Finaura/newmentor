import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillBell, AiFillSetting } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [scroll, setScroll] = useState(0);
  const [isSettingButtonClick, setIsSettingbuttonClick] = useState(false);

  window.onscroll = () => {
    setScroll(window.scrollY);
  };

  const navigate = useNavigate();
  return (
    <section id={scroll > 1 ? "navbar-finalScrolled" : "navbar-final"}>
      {/* <ToastContainer /> */}
      <div onClick={() => navigate("/")} className="navbar-brand-logo-img-cont">
        <img
          className="navbar-final-brand-logo-img"
          src={"images/Reverr-Logo.png"}
          alt="brand-logo"
        />
      </div>
      <div className="navbar-icons-cont">
        <button
          className="navbar_final_upgrade_btn"
          onClick={() => navigate("/upgrade")}
        >
          Upgrade
        </button>

        <div
          //   onClick={() => setRequestsbuttonClick((current) => !current)}
          className="navbar-topp-social-icon navbar_noOuterContCSS"
        >
          {/* {userDoc?.receivedRequests?.length===0&&userDoc?.notification?.length===0?<img className='nabar-final-requestIcon-cont' src="./images/icons8-alarm-64.png" alt="nav-icons" />:<img className='nabar-final-requestIcon-cont' src="./images/icons8-alarm-64 (1).png" alt="nav-icons" />} */}
          <AiFillBell
            className={
              //   userDoc?.receivedRequests?.length === 0 &&
              //   userDoc?.notification?.length === 0
              //     ? "nabar-final-notificationBell"
              //     :
              "nabar-final-notificationBell1"
            }
          />
          {/* {isRequestsButtonClick ? ( */}
          {/* <div className="notifiction-dropdown-cont">
            {userDoc?.receivedRequests?.length === 0 &&
            userDoc?.notification?.length === 0 ? (
              <p className="notifiction-dropdown-Request-Cont">
                No New Notification
              </p>
            ) : null}
            {userDoc?.notification?.map((item) => {
              return (
                <>
                  <p className="notifiction-dropdown-Request-Cont">
                    <span style={{ height: "fit-content" }}>
                      <img
                        className="notifiction-dropdown-Request-image"
                        src={
                          notificationList?.filter((e) => {
                            return e.id === item;
                          })[0]?.image
                        }
                        alt="requestUsrImg"
                      />
                    </span>
                    <span className="notifiction-dropdown-Request-name">
                      {
                        notificationList?.filter((e) => {
                          return e.id === item;
                        })[0]?.name
                      }
                    </span>{" "}
                    has accepted your follow request
                    <span
                      onClick={() => handleDeleteNotification(item)}
                      className="notifiction-dropdown-Request-reject"
                    >
                      ❌
                    </span>
                  </p>
                </>
              );
            })}
            {userDoc?.receivedRequests?.map((item) => {
              return (
                <>
                  <p className="notifiction-dropdown-Request-Cont">
                    <span style={{ height: "fit-content" }}>
                      <img
                        className="notifiction-dropdown-Request-image"
                        src={
                          userDocList?.filter((e) => {
                            return e.id === item;
                          })[0]?.image
                        }
                        alt="requestUsrImg"
                      />
                    </span>
                    <span className="notifiction-dropdown-Request-name">
                      {
                        userDocList?.filter((e) => {
                          return e.id === item;
                        })[0]?.name
                      }
                    </span>{" "}
                    wants to follow you{" "}
                    <span
                      onClick={() => handleAcceptFollowRequest(item)}
                      className="notifiction-dropdown-Request-accept"
                    >
                      ✅
                    </span>
                    <span
                      onClick={() => handleRejectFollowRequest(item)}
                      className="notifiction-dropdown-Request-reject"
                    >
                      ❌
                    </span>
                  </p>
                </>
              );
            })}
          </div> */}
        </div>
        <div>
          <FaCalendarAlt />
        </div>
        <img
          onClick={() => navigate("/userprofile")}
          className="navbar_final_user_Image"
          src="./images/user-round-img.png"
          alt="userimg"
        />
        {/* <div className="navbar-topp-social-icon">
    <FaUserAlt className="nabar-final-userProfile-Icon" onClick={() => navigate("/userprofile")}/>
    </div> */}

        <div
          onClick={() => setIsSettingbuttonClick((current) => !current)}
          className="navbar-topp-social-icon setting-social-icon-cont navbar_noOuterContCSS"
        >
          {/* <AiFillSetting className="nabar-final-setting-Icon" /> */}
          <MdOutlineKeyboardArrowDown className="nabar-final-setting-Icon" />

          {isSettingButtonClick ? (
            <div className="setting-dropdown-cont">
              {/* <button
                onClick={() => navigate("/change-user-password")}
                className="setting-dropdown-button"
              >
                Change Password
              </button> */}
              <button
                onClick={() => navigate("/userprofile")}
                className="setting-dropdown-button"
              >
                My Profile
              </button>
              <button
                onClick={() => navigate("/user-edit-profile")}
                className="setting-dropdown-button"
              >
                Edit Profile
              </button>
              <button
                // onClick={
                //   user
                //     ? () =>
                //         signOut(auth)
                //           .then(() => {
                //             dispatch(logout());
                //             dispatch(remove());
                //             dispatch(removeUserDoc());
                //             dispatch(removeUserFundingDoc());
                //           })
                //           .then(() => {
                //             toast.success("Sucessfully logged out");
                //             navigate("/");
                //           })
                //     : () => navigate("/login")
                // }
                className="setting-dropdown-button"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
