import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { FiArrowUpRight } from "react-icons/fi";
import BlogCard from "../../components/Blog Card/BlogCard";

import "./Dashboard.css";

const Dashboard = () => {
  const [hasMeeting, setHasMeeting] = useState(false);

  const item = {
    id: 1,
    image: { imageUrl: "../images/welcomeImg.png", imageName: "blog " },
    publishedOn: "1st March",
    heading: "My blog",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla exercitationem iusto soluta quas laudantium quam maxime voluptates incidunt, dolores unde est architecto quae consequuntur distinctio, dolore voluptate ut eligendi provident?",
  };

  return (
    <Layout>
      <section className="dashboard">
        {/* USER INFO CONTAINER */}
        <div className="user-container">
          <div>
            <h1 className="greeting">
              Welcome{" "}
              <span>
                <h4 className="userName">{"User"}</h4>
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

            <section className="meeting-container">
              {/* <DashboardToolsCont /> */}
              <h1>Transaction</h1>
            </section>

            {/* JOIN OUR COMUNITY CONTAINER */}
            <section className="join-our-comunity-cont">
              <img
                className="join-our-comunity-img"
                src="./images/image 831.png"
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
              <BlogCard item={item} key={item.id} />
              <BlogCard item={item} key={item.id} />
              <BlogCard item={item} key={item.id} />
              {/* {blogArray.slice(0, 3).map((item, index) => {
                return <BlogCard item={item} key={index} />;
              })} */}
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
              {/* {blogArray.slice(0, 3).map((item, index) => {
                return <BlogCard item={item} key={index} />;
              })} */}
              <BlogCard item={item} key={item.id} />
              <BlogCard item={item} key={item.id} />
              <BlogCard item={item} key={item.id} />
            </section>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default Dashboard;
