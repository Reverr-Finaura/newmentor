import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <section className={styles.loginOuterCont}>
      <div className={styles.leftCont}>
        <div className={styles.brandLogoCont}>
          <img
            className={styles.brandLogo}
            alt=""
            src="images/Reverr Black 2.png"
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
        <h1 className={styles.rightContHeading}>MENTOR's LOGIN</h1>
        <button className={styles.googleBtn}>
          <span className={styles.gIconCont}>
            <img
              className={styles.gICon}
              src="/images/icons_google.png"
              alt="gICon"
            />
          </span>
          Log in with google{" "}
        </button>
        <p className={styles.orText}>-OR-</p>
        <form className={styles.form}>
          <label>Email</label>
          <input
            className={styles.input}
            type="text"
            name="email"
            placeholder="Email Address"
            required
          />
          <label>Password</label>
          <input
            className={styles.input}
            type="password"
            name="email"
            placeholder="Password"
            required
          />
          <button className={styles.Button} type="submit">
            Login Now
          </button>
        </form>
        <p className={styles.randomtext}>
          Need an account?{" "}
          <Link className={styles.linkk} to="/signup">
            Sign Up
          </Link>
        </p>
        <p className={styles.randomtext}>
          Forgot Password?{" "}
          <Link to="/forgotpassword" className={styles.linkk}>
            Click Here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
