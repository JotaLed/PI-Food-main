import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./styles/detail.module.css";

function Detail() {
  const recipes = useSelector((state) => state.recipes);
  const id = useParams().id;
  const recipe = recipes.find((recipe) => recipe.id.toString() === id);

  if (!recipe) {
    return <div className={styles.container}>Recipe not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.recipeContainer}>
        <img className={styles.image} src={recipe.image} alt={recipe.id} />
        <h3 className={styles.title}>ID: {recipe.id}</h3>
        <h3 className={styles.title}>Name: {recipe.name}</h3>
        <hr />
        <h3 className={styles.title}>
          Summary: {recipe.summary.replace(/(<([^>]+)>)/gi, "")}
        </h3>
        <h3 className={styles.title}>HealthScore: {recipe.healthScore}</h3>
        <hr />
        <h3 className={styles.title}>Analysed Instructions:</h3>
        <ul className={styles.instructionsList}>
          {recipe.analyzedInstructions.map((instruction, index) => (
            <li key={index} className={styles.instruction}>
              Step {instruction.number}: {instruction.step}
            </li>
          ))}
        </ul>
        <h3 className={styles.title}>Diets:</h3>
        <ul className={styles.dietsList}>
          {recipe.diets.map((diet, index) => (
            <li key={index} className={styles.diet}>
              {diet}
            </li>
          ))}
        </ul>
      </div>
      <Link to="/home">
        <button className={styles.button}>Home</button>
      </Link>
    </div>
  );
}

export default Detail;
