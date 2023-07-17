import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/landing.module.css";
import logo from "../media/logo.png";

function Landing() {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <Link to="/home">
        <button className={styles.button}>Enter to page</button>
      </Link>
    </div>
  );
}

export default Landing;
