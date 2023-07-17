import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import styles from "./styles/cards.module.css";

function Cards() {
  const recipesToShow = useSelector((state) => state.recipesToShow);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const recipesPerPage = useSelector(
    (state) => state.pagination.recipesPerPage
  );

  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;

  return (
    <div className={styles.cardGrid}>
      {recipesToShow.slice(startIndex, endIndex).map((recipe) => (
        <Card
          key={recipe.id}
          id={recipe.id}
          image={recipe.image}
          name={recipe.name}
          diets={recipe.diets}
          healthScore={recipe.healthScore}
          analyzedInstructions={recipe.analyzedInstructions}
          summary={recipe.summary}
        />
      ))}
    </div>
  );
}

export default Cards;

//no es necesario verificar si recipesToShow esta vacío, debido a que sólo puede estar
//vacio cuando se hace una búsqueda por nombre sin resultado, pero en ese caso en lugar de
//renderizar Cards se renderiza un mensaje en Home
