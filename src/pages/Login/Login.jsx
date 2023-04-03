import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { login, setUserData } from "../../features/userSlice";
import { auth, db, getUserFromDatabase } from "../../firebase";
import { useDispatch } from "react-redux";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      const user_n = await getUserFromDatabase(user.email);
      if (user_n.userType === "Mentor") {
        dispatch(
          login({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
          })
        );
        navigate("/dashboard");
      } else {
        console.log("Not a mentor");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const loginEmail = async (e) => {
    e.preventDefault();
    try {
      const user_n = await getUserFromDatabase(email);
      if (user_n.userType === "Mentor") {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      } else {
        console.log("Not a mentor");
      }
      // console.log(res);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

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
        <button className={styles.googleBtn} onClick={signInWithGoogle}>
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
        <form className={styles.form} onSubmit={loginEmail}>
          <label>Email</label>
          <input
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
