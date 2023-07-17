import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipesFromAPI,
  getDietsFromAPI,
  setRecipesToShow,
  setPaginationTotalRecipes,
  setPaginationRecipesPerPage,
  setPaginationTotalPages,
} from "../redux/actions";
import Search from "./Search";
import Pagination from "./Pagination";
import Cards from "./Cards";
import FiltersAndOrderers from "./FilterAndOrders";
import styles from "./styles/home.module.css";

function Home() {
  const recipes = useSelector((state) => state.recipes);
  const searchByName = useSelector((state) => state.searchByName);
  const filtersAndOrders = useSelector((state) => state.filtersAndOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipesFromAPI());
    dispatch(getDietsFromAPI());
  }, [dispatch]);

  useEffect(() => {
    let recipesToShow;

    //realizar los filtrados y ordenamientos.
    if (searchByName !== null && searchByName.length === 0) {
      dispatch(setRecipesToShow([]));
    } else {
      if (searchByName === null) {
        recipesToShow = [...recipes];
      } else {
        recipesToShow = [...searchByName];
      }

      if (filtersAndOrders.filterByDietTypes !== "") {
        recipesToShow = recipesToShow.filter((recipe) =>
          recipe.diets.includes(filtersAndOrders.filterByDietTypes)
        );
      }

      if (filtersAndOrders.filterByOrigin !== "") {
        if (filtersAndOrders.filterByOrigin === "db") {
          recipesToShow = recipesToShow.filter(
            (recipe) => recipe.createdInDb === true
          );
        } else {
          recipesToShow = recipesToShow.filter(
            (recipe) => recipe.hasOwnProperty("createdInDb") === false
          );
        }
      }

      const compareByName = (a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      };

      if (filtersAndOrders.orderByName === "ascendent") {
        recipesToShow = recipesToShow.sort(compareByName);
      } else if (filtersAndOrders.orderByName === "descendent") {
        recipesToShow = recipesToShow.sort((a, b) => compareByName(b, a));
      }

      const compareByHealthscore = (a, b) => {
        return a.healthScore - b.healthScore;
      };

      if (filtersAndOrders.orderByHealthscore === "ascendent") {
        recipesToShow = recipesToShow.sort(compareByHealthscore);
      } else if (filtersAndOrders.orderByHealthscore === "descendent") {
        recipesToShow = recipesToShow.sort((a, b) =>
          compareByHealthscore(b, a)
        );
      }

      dispatch(setRecipesToShow(recipesToShow));

      const numOfRecipesToPaginated = recipesToShow.length;
      const recipesPerPage = 9;
      const totalPages = Math.ceil(numOfRecipesToPaginated / recipesPerPage);

      dispatch(setPaginationTotalRecipes(numOfRecipesToPaginated));
      dispatch(setPaginationRecipesPerPage(recipesPerPage));
      dispatch(setPaginationTotalPages(totalPages));
    }
  }, [
    dispatch,
    filtersAndOrders.filterByDietTypes,
    filtersAndOrders.filterByOrigin,
    filtersAndOrders.orderByHealthscore,
    filtersAndOrders.orderByName,
    filtersAndOrders.orderByNumberOfEpisodes,
    recipes,
    searchByName,
  ]);

  return (
    <div className={styles.container}>
      {recipes.length === 0 ? (
        <h3 className={styles.loading}>Loading...</h3>
      ) : (
        <React.Fragment>
          <Search />
          {searchByName !== null && searchByName.length === 0 ? (
            <p>No hay coincidencias</p>
          ) : (
            <React.Fragment>
              <FiltersAndOrderers />
              <Pagination />
              <Cards />
            </React.Fragment>
          )}
        </React.Fragment>
      )}

      {/* <Search />
      {searchByName !== null && searchByName.length === 0 ? (
        <p>No hay coincidencias</p>
      ) : recipes.length === 0 ? (
        <h3 className={styles.loading}>Loading...</h3>
      ) : (
        <>
          <FiltersAndOrderers />
          <Pagination />
          <Cards />
        </>
      )} */}
    </div>
  );
}

export default Home;
