import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/card.module.css";

function Card(props) {
  return (
    <Link style={{ textDecoration: "none" }} to={`/detail/${props.id}`}>
      <div className={styles.card}>
        <img className={styles.image} src={props.image} alt={props.id} />
        <h3 className={styles.title}>{props.name}</h3>
        <p className={styles.healthScore}>Healthscore: {props.healthScore}</p>
        <div className={styles["diet-container"]}>
          {props.diets.map((diet, index) => (
            <span className={styles.diet} key={index}>
              {diet}
              {index < props.diets.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Card;
