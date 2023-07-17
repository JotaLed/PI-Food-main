import React from "react";
import styles from "./styles/logoBar.module.css";
import logo from "../media/logo.png";

function LogoBar() {
  return (
    <div className={styles.logoBar}>
      <img className={styles.logo} src={logo} alt="logo" />
    </div>
  );
}

export default LogoBar;
