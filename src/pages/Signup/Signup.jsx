import React from "react";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";

const Signup = () => {
  return (
    <section className={styles.loginOuterCont}>
      <div className={styles.leftCont}>
        <div className={styles.brandLogoCont}>
          <img
            className={styles.brandLogo}
            src={"/images/Reverr Black 2.png"}
            alt=""
          />
          <p className={styles.brandName}>REVERR</p>
        </div>
        <div className={styles.leftMidCont}>
          <h1 className={styles.leftMidContTopText}>YOUR DREAM</h1>
          <h1 className={styles.leftMidContBottomText}>OUR RESPONSIBILITY</h1>
        </div>
        <div className={styles.leftBottomCont}>
          <h1 className={styles.leftBottomContTopText}>
            If you can dream it we can complete it.
          </h1>
          <h1 className={styles.leftBottomContBottomText}>
            Because we very well believe in OUR MOTO
          </h1>
        </div>
      </div>
      <div className={styles.rightCont}>
        <h1 className={styles.rightContHeading}>MENTOR's SIGNUP</h1>
        <button className={styles.googleBtn}>
          <span className={styles.gIconCont}>
            <img
              className={styles.gICon}
              src="/images/icons_google.png"
              alt="gICon"
            />
          </span>
          Sign up with google{" "}
        </button>
        <p className={styles.orText}>-OR-</p>
        <form className={styles.form}>
          <label htmlFor="">Firt Name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="First Name"
            required
          />
          <label htmlFor="">Last Name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Last Name"
            required
          />
          <label htmlFor="">Phone Number</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Your Phone Number"
            required
          />
          <label htmlFor="">Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="Your E-Mail"
            required
          />
          <label htmlFor="">Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Enter a password"
            required
          />
          <label htmlFor="">Confirm Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm Password"
            required
          />

          <button className={styles.Button} type="submit">
            Sign Up
          </button>
        </form>
        <p className={styles.links}>
          Already have an account?{" "}
          <Link className={styles.linkk} to="/login">
            Login Here
          </Link>
        </p>
        <div className={styles.links}>
          {/* <p>
            {`Want to join as a ${
              userType === "FOUNDER" ? "MENTOR" : "FOUNDER"
            }?`}
          </p>
          <button
            onClick={() =>
              setUserType(userType === "FOUNDER" ? "MENTOR" : "FOUNDER")
            }
            className={styles.apply_link}
          >
            Apply Here
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Signup;
