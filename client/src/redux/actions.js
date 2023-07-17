import axios from "axios";
import {
  GET_RECIPES_FROM_API,
  CREATE_RECIPE,
  SET_RECIPES_TO_SHOW,
  SEARCH_RECIPES_BY_NAME,
  CLEAR_SEARCH,
  GET_DIETS_FROM_API,
  CHANGE_FILTER_BY_DIET_TYPES,
  CHANGE_FILTER_BY_ORIGIN,
  CHANGE_ORDER_BY_NAME,
  CHANGE_ORDER_BY_HEALT_SCORE,
  CLEAR_FILTERS_AND_ORDERS,
  SET_PAGINATION_TOTAL_RECIPES,
  SET_PAGINATION_RECIPES_PER_PAGE,
  SET_PAGINATION_TOTAL_PAGES,
  SET_PAGINATION_CURRENT_PAGE,
} from "./actionTypes";

// -------------------------------------RECIPES
export const getRecipesFromAPI = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/recipes");
      dispatch({ type: GET_RECIPES_FROM_API, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createRecipe = (newRecipe) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/recipes", newRecipe);
      dispatch({ type: CREATE_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

// -------------------------------------SEARCH
export const searchRecipesByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/recipes/name?name=${name}`);
      dispatch({ type: SEARCH_RECIPES_BY_NAME, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearSearchRecipesByName = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_SEARCH });
  };
};

// -------------------------------------RECIPES TO SHOW
export const setRecipesToShow = (recipes) => {
  return {
    type: SET_RECIPES_TO_SHOW,
    payload: recipes,
  };
};

// -------------------------------------DIETS
export const getDietsFromAPI = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/diets");
      const diets = response.data;

      dispatch({ type: GET_DIETS_FROM_API, payload: diets });
    } catch (error) {
      console.log(error);
    }
  };
};

// -------------------------------------FILTERS AND ORDERS
export const changeFilterByDietTypes = (dietType) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_FILTER_BY_DIET_TYPES, payload: dietType });
    dispatch(setPaginationCurrentPage(1)); // Agregar esta línea para establecer la página en 1
  };
};

export const changeFilterByOrigin = (origin) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_FILTER_BY_ORIGIN, payload: origin });
    dispatch(setPaginationCurrentPage(1)); // Agregar esta línea para establecer la página en 1
  };
};

export const changeOrderByName = (name) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_ORDER_BY_NAME, payload: name });
    dispatch(setPaginationCurrentPage(1)); // Agregar esta línea para establecer la página en 1
  };
};

export const changeOrderByHealtScore = (score) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_ORDER_BY_HEALT_SCORE, payload: score });
    dispatch(setPaginationCurrentPage(1)); // Agregar esta línea para establecer la página en 1
  };
};

export const clearFiltersAndOrders = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_FILTERS_AND_ORDERS });
    dispatch(setPaginationCurrentPage(1)); // Agregar esta línea para establecer la página en 1
  };
};

// -------------------------------------PAGINATION
export const setPaginationTotalRecipes = (totalRecipes) => {
  return (dispatch) => {
    dispatch({
      type: SET_PAGINATION_TOTAL_RECIPES,
      payload: totalRecipes,
    });
  };
};

export const setPaginationRecipesPerPage = (recipesPerPage) => {
  return (dispatch) => {
    dispatch({
      type: SET_PAGINATION_RECIPES_PER_PAGE,
      payload: recipesPerPage,
    });
  };
};

export const setPaginationTotalPages = (totalPages) => {
  return (dispatch) => {
    dispatch({ type: SET_PAGINATION_TOTAL_PAGES, payload: totalPages });
  };
};

export const setPaginationCurrentPage = (currentPage) => {
  return (dispatch) => {
    dispatch({ type: SET_PAGINATION_CURRENT_PAGE, payload: currentPage });
  };
};
