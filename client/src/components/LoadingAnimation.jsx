import React from "react";
import styles from "./styles/loadingAnimation.module.css";

function LoadingAnimation() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default LoadingAnimation;
