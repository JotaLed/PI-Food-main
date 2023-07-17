import React from "react";
import styles from "./styles/footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.message}>
        © 2023 PI Henry. Todos los derechos reservados... y los izquierdos
        también.
      </p>
      <p className={styles.loveMessage}>
        Hecho con amor{" "}
        <span role="img" aria-label="Corazón">
          ❤️
        </span>
      </p>
    </div>
  );
}

export default Footer;
