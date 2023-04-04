import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillBell, AiFillSetting } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth, createNetworkInMessagesDoc, db } from "../../firebase";
import { logout, selectUser } from "../../features/userSlice";
import { remove } from "../../features/newUserSlice";
import { removeUserDoc, setUserDoc } from "../../features/userDocSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);

  const [isRequestsButtonClick, setRequestsbuttonClick] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [userDocList, setUserDocList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [isSettingButtonClick, setIsSettingbuttonClick] = useState(false);

  window.onscroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    if (userDoc?.image !== "") {
      setUserImage(userDoc.image);
      return;
    }
    if (user?.user?.photoURL !== null) {
      setUserImage(user?.user?.photoURL);
      return;
    } else {
      setUserImage(
        "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
      );
      return;
    }
  }, [userDoc]);

  useEffect(() => {
    setUserImage(
      "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
    );
  }, []);

  //CHECK FOR NOTIFICATION
  useEffect(() => {
    async function fetchNotificationFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (userDoc?.notification?.includes(doc.id)) {
          setNotificationList((prev) => {
            return [...prev, { ...doc.data(), id: doc.id }];
          });
        }
      });
    }
    fetchNotificationFromFirebase();
  }, [isRequestsButtonClick]);

  // CHECK FOR USER DOC LIST WHO HAS REQUESTED FOLLOW
  useEffect(() => {
    async function fetchUserDocListFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (userDoc?.receivedRequests?.includes(doc.id))
          setUserDocList((prev) => {
            return [...prev, { ...doc.data(), id: doc.id }];
          });
      });
    }
    fetchUserDocListFromFirebase();
  }, [isRequestsButtonClick]);

  //HANDLE ACCEPT FOLLOW REQUEST
  const handleAcceptFollowRequest = async (id) => {
    const userData = [];
    //GET DATA OF USER WHO HAS REQUESTED FOLLOW REQUEST
    const userRef = collection(db, "Users");
    const q = query(userRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        userData.push({ ...doc.data(), id: doc.id });
      }
    });

    acceptFollowRequest(id, userData[0]);
  };
  //ACCEPT FOLLOW REQUEST
  const acceptFollowRequest = async (id, userData) => {
    let notificationArray;
    if (!userDoc.notification) {
      notificationArray = [];
    } else {
      notificationArray = userDoc.notification;
    }
    const newNotificationArray = [...notificationArray, userDoc.email];

    const newReceivedRequestsArray = userDoc.receivedRequests.filter((item) => {
      return item !== id;
    });
    const newNetworkArray = userDoc.network.concat([id]);

    const userDocumentRef = doc(db, "Users", userDoc.email);

    const userWhoRequestedFollowDocRef = doc(db, "Users", id);
    const userWhoRequestedNewNetworkArray = userData.network.concat([
      userDoc.email,
    ]);
    const userWhoRequestedNewsendRequestArray = userData.sendRequests.filter(
      (item) => {
        return item !== user?.user?.email;
      }
    );
    const updatedUserDoc = {
      ...userDoc,
      receivedRequests: newReceivedRequestsArray,
      network: newNetworkArray,
    };
    console.log(
      "userWhoRequestedNewNetworkArray",
      userWhoRequestedNewNetworkArray
    );
    try {
      await updateDoc(userDocumentRef, {
        receivedRequests: newReceivedRequestsArray,
        network: newNetworkArray,
      });
      await updateDoc(userWhoRequestedFollowDocRef, {
        sendRequests: userWhoRequestedNewsendRequestArray,
        network: userWhoRequestedNewNetworkArray,
        notification: newNotificationArray,
      });
      await createNetworkInMessagesDoc(userDoc.email,id);
      toast("Accepted Follow Request");
      dispatch(setUserDoc(updatedUserDoc));
      window.location.reload()
    } catch (error) {
      console.log(error.message);
    }
  };

  //HANDLE REJECT FOLLOW REQUEST
  const handleRejectFollowRequest = async (id) => {
    const userData = [];
    //GET DATA OF USER WHO HAS REQUESTED FOLLOW REQUEST
    const userRef = collection(db, "Users");
    const q = query(userRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        userData.push({ ...doc.data(), id: doc.id });
      }
    });
    rejectFollowRequest(id, userData[0]);
  };
  //REJECT FOLLOW REQUEST
  const rejectFollowRequest = async (id, userData) => {
    const newReceivedRequestsArray = userDoc.receivedRequests.filter((item) => {
      return item !== id;
    });
    const userDocumentRef = doc(db, "Users", userDoc.email);
    const userWhoRequestedFollowDocRef = doc(db, "Users", id);
    const userWhoRequestedNewsendRequestArray = userData.sendRequests.filter(
      (item) => {
        return item !== user?.user?.email;
      }
    );
    const updatedUserDoc = {
      ...userDoc,
      receivedRequests: newReceivedRequestsArray,
    };

    try {
      await updateDoc(userDocumentRef, {
        receivedRequests: newReceivedRequestsArray,
      });
      await updateDoc(userWhoRequestedFollowDocRef, {
        sendRequests: userWhoRequestedNewsendRequestArray,
      });
      toast("Rejected Follow Request");
      dispatch(setUserDoc(updatedUserDoc));
    } catch (error) {
      console.log(error.message);
    }
  };

  //HANDLE DELETE NOTIFICATION

  const handleDeleteNotification = async (id) => {
    const newNotificationList = notificationList.filter((item) => {
      return item.id !== id;
    });
    const userDocumentRef = doc(db, "Users", userDoc.email);
    const updatedUserDoc = { ...userDoc, notification: newNotificationList };
    try {
      await updateDoc(userDocumentRef, { notification: newNotificationList });
      dispatch(setUserDoc(updatedUserDoc));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section id={scroll > 1 ? "navbar-finalScrolled" : "navbar-final"}>
      <ToastContainer />
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
          onClick={() => setRequestsbuttonClick((current) => !current)}
          className="navbar-topp-social-icon navbar_noOuterContCSS"
        >
          {/* {userDoc?.receivedRequests?.length === 0 &&
          userDoc?.notification?.length === 0 ? (
            <img
              className="nabar-final-requestIcon-cont"
              src="./images/icons8-alarm-64.png"
              alt="nav-icons"
            />
          ) : (
            <img
              className="nabar-final-requestIcon-cont"
              src="./images/icons8-alarm-64 (1).png"
              alt="nav-icons"
            />
          )} */}
          <AiFillBell
            className={
              userDoc?.receivedRequests?.length === 0 &&
              userDoc?.notification?.length === 0
                ? "nabar-final-notificationBell"
                : "nabar-final-notificationBell1"
            }
          />
          {isRequestsButtonClick ? (
            <div className="notifiction-dropdown-cont">
              {userDoc?.receivedRequests?.length === 0 &&
              userDoc?.notification?.length === 0 ? (
                <p className="notifiction-dropdown-Request-Cont">
                  No New Notification
                </p>
              ) : null}
              {userDoc?.notification?.map((item) => {
                return (
                  <>
                    <p className="notifiction-dropdown-Request-Cont" key={item}>
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
                    <p className="notifiction-dropdown-Request-Cont" key={item}>
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
            </div>
          ) : null}
        </div>

        <div className="nabar-final-calenderBell">
          <FaCalendarAlt />
        </div>

        <div
          onClick={() => setIsSettingbuttonClick((current) => !current)}
          className="navbar-topp-social-icon setting-social-icon-cont navbar_noOuterContCSS"
        >
          {" "}
          <img
            onClick={() => navigate("/my-profile")}
            className="navbar_final_user_Image"
            src={userImage}
            alt="userimg"
          />
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
                onClick={() => navigate("/my-profile")}
                className="setting-dropdown-button"
              >
                My Profile
              </button>
              {/* <button
                onClick={() => navigate("/user-edit-profile")}
                className="setting-dropdown-button"
              >
                Edit Profile
              </button> */}
              <button
                onClick={
                  user
                    ? () =>
                        signOut(auth)
                          .then(() => {
                            dispatch(logout());
                            dispatch(remove());
                            dispatch(removeUserDoc());
                            // dispatch(removeUserFundingDoc());
                          })
                          .then(() => {
                            toast.success("Sucessfully logged out");
                            navigate("/");
                          })
                    : () => navigate("/login")
                }
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
