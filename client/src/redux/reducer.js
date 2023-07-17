import { combineReducers } from "redux";
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

const initialState = {
  recipes: [],
  loading: false,
  searchByName: null,
  recipesToShow: [],
  diets: [],
  filtersAndOrders: {
    filterByDietTypes: "",
    filterByOrigin: "",
    orderByName: "",
    orderByHealthscore: "",
  },
  pagination: {
    totalRecipes: null,
    recipesPerPage: null,
    totalPages: null,
    currentPage: 1,
  },
};

const recipesReducer = (state = initialState.recipes, action) => {
  switch (action.type) {
    case GET_RECIPES_FROM_API:
      return action.payload;
    case CREATE_RECIPE:
      const recipes = [action.payload, ...state];
      return recipes;
    default:
      return state;
  }
};

const recipesToShowReducer = (state = initialState.recipesToShow, action) => {
  switch (action.type) {
    case SET_RECIPES_TO_SHOW:
      return [...action.payload];
    default:
      return state;
  }
};

const searchByNameReducer = (state = initialState.searchByName, action) => {
  switch (action.type) {
    case SEARCH_RECIPES_BY_NAME:
      if (!action.payload.length) {
        return [];
      } else {
        return [...action.payload];
      }

    case CLEAR_SEARCH:
      return null;
    default:
      return state;
  }
};

const dietsReducer = (state = initialState.diets, action) => {
  switch (action.type) {
    case GET_DIETS_FROM_API:
      return [...action.payload];
    default:
      return state;
  }
};

const filtersAndOrdersReducer = (
  state = initialState.filtersAndOrders,
  action
) => {
  switch (action.type) {
    case CHANGE_FILTER_BY_DIET_TYPES:
      return {
        ...state,
        filterByDietTypes: action.payload,
      };
    case CHANGE_FILTER_BY_ORIGIN:
      return {
        ...state,

        filterByOrigin: action.payload,
      };
    case CHANGE_ORDER_BY_NAME:
      return {
        ...state,

        orderByName: action.payload,
      };
    case CHANGE_ORDER_BY_HEALT_SCORE:
      return {
        ...state,

        orderByHealthscore: action.payload,
      };
    case CLEAR_FILTERS_AND_ORDERS:
      return {
        filterByDietTypes: "",
        filterByOrigin: "",
        orderByName: "",
        orderByHealthscore: "",
      };
    default:
      return state;
  }
};

const paginationReducer = (state = initialState.pagination, action) => {
  switch (action.type) {
    case SET_PAGINATION_TOTAL_RECIPES:
      return { ...state, totalRecipes: action.payload };
    case SET_PAGINATION_RECIPES_PER_PAGE:
      return { ...state, recipesPerPage: action.payload };
    case SET_PAGINATION_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    case SET_PAGINATION_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  recipes: recipesReducer,
  searchByName: searchByNameReducer,
  recipesToShow: recipesToShowReducer,
  diets: dietsReducer,
  filtersAndOrders: filtersAndOrdersReducer,
  pagination: paginationReducer,
});

export default rootReducer;
