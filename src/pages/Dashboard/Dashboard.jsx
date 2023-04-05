import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { FiArrowUpRight } from "react-icons/fi";
import BlogCard from "../../components/Blog Card/BlogCard";
import "./Dashboard.css";
// eslint-disable-next-line
import {addDoc,collection,doc,getDocs,query,setDoc} from "firebase/firestore";
import {
  db,
  getPaymentsfromFirebase,
  getUserFromDatabase,
} from "../../firebase";
import MessagesCont from "../Chat/Messages/MessagesCont";
import Table from "../../components/Transactiontable dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { setUserDoc } from "../../features/userDocSlice";
import { getPayments } from "../../features/paymentSlice";
import { useNavigate } from "react-router-dom";
import comImg from "../../icons/community mockup.svg"

const Dashboard = () => {
  const navigate=useNavigate()
  // eslint-disable-next-line
  const [hasMeeting, setHasMeeting] = useState(false);
  const [blogArray, setBlogArray] = useState([]);
  const [userName, setUserName] = useState("");
  const blogData = [];
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);
  // eslint-disable-next-line
  const [userDocId, setUserDocId] = useState([]);
  const dispatch = useDispatch();

  // console.log("user", user);
  // console.log("userdoc", userDoc);

  //CHECK FOR PAYMENTS

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await getPaymentsfromFirebase(user?.user?.email);
      const arr = await Promise.all(
        res.map(async (payment) => {
          let name = await getUserFromDatabase(payment.user);
          return { ...payment, name: name?.name };
        })
      );
      dispatch(getPayments(arr));
    };
    if(user?.user?.email){fetchPayments();}
  
    // eslint-disable-next-line
  }, [user]);

  // CHECK FOR USER DOC DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUserDocId((prev) => {
          return [...prev, doc.id];
        });
        if (doc.id === user?.user?.email) {
          dispatch(setUserDoc(doc.data()));
        }
      });
    }
    fetchUserDocFromFirebase();
    // eslint-disable-next-line
  }, [user]);

  // CHECK FOR USER NAME
  useEffect(() => {
    if (userDoc?.name && userDoc?.name !== "") {
      setUserName(userDoc.name);
      return;
    }
    if (user?.user?.displayName !== null) {
      setUserName(user?.user?.displayName);
      return;
    }

    var idx = user?.user?.email.indexOf("@");
    var name = user?.user?.email.slice(0, idx);
    setUserName(name);
    // eslint-disable-next-line
  }, [userDoc]);

  //FETCH BLOG DATA FROM FIREBASE

  useEffect(() => {
    async function fetchBlogsFromDb() {
      const blogRef = collection(db, "Blogs");
      const q = query(blogRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        blogData.push(doc.data());
      });
      setBlogArray(blogData);
    }
    fetchBlogsFromDb();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <section className="dashboard">
        {/* USER INFO CONTAINER */}
        <div className="user-container">
          <div>
            <h1 className="greeting ">
              Welcome{" "}
              <span>
                <h4 className="userName">{userName}</h4>
              </span>{" "}
              !
            </h1>
            <img
              className="handwave-img"
              src="./images/welcomeImg.png"
              alt="handwave"
            />
          </div>
        </div>
        <section id="dashboard-data-cont">
          <div className="dashboard-data-left-cont">
            {/* Meeting container */}
            <section className="meeting-container">
              <h1 className="meeting-container-titlee">Meetings</h1>
              <h1 className="meeting-container-current-date">
                {new Date().toDateString().slice(4)}
              </h1>

              {hasMeeting ? null : (
                <>
                  <h2 className="no-meeting-schedule-msg">
                    No Meeting Scheduled For Today
                  </h2>
                </>
              )}
              {/* <EventCard
                meetingArray={meetingArray}
                purementorArray={purementorArray}
              /> */}
            </section>
            {/* Transaction CONTAINER */}

            <section className="transaction-container">
              <div className="transaction_top">
                <div className="top_headings">
                  <h1>Transaction</h1>
                  <p>Check your payment information according to your needs.</p>
                </div>
                <button className="view_more_btn">
                  <span>Load more</span>
                  <FiArrowUpRight />
                </button>
              </div>
              <div className="transaction_table">
                <Table />
              </div>
            </section>

            {/* JOIN OUR COMUNITY CONTAINER */}
            <section className="join-our-comunity-cont">
              <img
                className="join-our-comunity-img"
                src={comImg}
                alt="funding-img"
              />
              <h4 className="join-our-comunity-title">
                A community that unites the Startup’s and Entrepreneur’s to help
                them grow by sharing there ideas, experiences and what not
              </h4>
              <a
                href="https://play.google.com/store/apps/details?id=com.reverr"
                target="_blank"
                rel="noreferrer"
              >
                <button className="join-our-comunity-btn">
                  Explore Our Community Now
                </button>
              </a>
            </section>
          </div>
          <div className="dashboard-data-right-cont">
            {/* MESSAGES CONTAINER */}
            <section className="dashboard_chat-containerr">
            <div onClick={()=>navigate("/messages")} className="dashboard_chat_container_coverr"></div>
              <MessagesCont />
            </section>
            <section className="blog-containerr">
              <div className="blog-containerr_Top">
                <h4
                  style={{ marginBottom: "1rem" }}
                  className="course-container-heading"
                >
                  Blogs
                </h4>
                <button
                  className="view_more_btn"
                  onClick={() =>
                    window.open("https://reverr.io/blog", "_blank")
                  }
                >
                  <span>View more</span>
                  <FiArrowUpRight />
                </button>
              </div>
              {blogArray.slice(0, 3).map((item, index) => {
                return <BlogCard item={item} key={index} />;
              })}
            </section>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default Dashboard;
