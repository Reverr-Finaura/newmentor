import React, { useState } from "react";
import styles from "./Profile.module.css";
import Layout from "../../Layout/Layout";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  return (
    <Layout>
      <section className={styles.profile_main}>
        <h1>My Profile</h1>
        <div className={styles.user_img}>
          <img
            src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=360"
            alt=""
          />

          <label
            htmlFor="img-upload"
            className={styles.img_upload_label}
            style={{ display: editMode ? "block" : "none" }}
          >
            <img src="./images/Camera.png" alt="" />
          </label>

          <input type="file" hidden id="img-upload" />
        </div>

        <button
          className={styles.profile_edit_btn}
          onClick={() => setEditMode(true)}
          style={{ display: !editMode ? "block" : "none" }}
        >
          Edit Now
        </button>

        <form className={styles.form_container}>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="name" className={styles.input_field_label}>
                Name
              </label>
              <input
                type="text"
                name="name"
                disabled={!editMode}
                placeholder="Enter name"
                id="name"
                className={styles.input_field}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="dob" className={styles.input_field_label}>
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                disabled={!editMode}
                className={styles.input_field}
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="gender" className={styles.input_field_label}>
                Gender
              </label>
              <input
                type="text"
                name="gender"
                disabled={!editMode}
                // placeholder="Gender"
                id="gender"
                className={styles.input_field}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="phone" className={styles.input_field_label}>
                Phone No.
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="enter your number "
                id="phone"
                disabled={!editMode}
                className={styles.input_field}
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="email" className={styles.input_field_label}>
                Email
              </label>
              <input
                type="email"
                disabled={!editMode}
                name="email"
                placeholder="Enter your email address"
                id="email"
                className={styles.input_field}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="designation" className={styles.input_field_label}>
                Designation
              </label>
              <input
                type="text"
                name="designation"
                disabled={!editMode}
                placeholder="Enter your designation"
                id="designation"
                className={styles.input_field}
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="state" className={styles.input_field_label}>
                State
              </label>
              <input
                type="text"
                name="state"
                disabled={!editMode}
                placeholder="Enter your State"
                id="state"
                className={styles.input_field}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="country" className={styles.input_field_label}>
                Country
              </label>
              <input
                type="text"
                name="country"
                disabled={!editMode}
                placeholder="Enter your country"
                id="country"
                className={styles.input_field}
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="about" className={styles.input_field_label}>
                About
              </label>
              <textarea
                className={styles.input_field}
                rows={4}
                name="about"
                disabled={!editMode}
                id="about"
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="exp" className={styles.input_field_label}>
                Experience
              </label>
              <textarea
                className={styles.input_field}
                rows={3}
                disabled={!editMode}
                name="exp"
                id="exp"
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="edu" className={styles.input_field_label}>
                Education
              </label>
              <input
                className={styles.input_field}
                name="edu"
                id="edu"
                disabled={!editMode}
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="cit" className={styles.input_field_label}>
                Contact Me
              </label>
              <input
                className={styles.input_field}
                name="contact_me"
                disabled={!editMode}
                id="contact_me"
                placeholder="provide social media handle"
              />
            </div>
          </div>
          <button
            className={styles.save_btn}
            disabled={!editMode}
            onClick={() => setEditMode(false)}
          >
            Save
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default Profile;
