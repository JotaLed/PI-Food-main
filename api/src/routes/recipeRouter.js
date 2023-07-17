const { Router } = require("express");
const {
  dataPostValidatorMiddleware,
  dataGetIDValidatorMiddleware,
  dataGetNameValidatorMiddleware,
} = require("../middlewares/index");
const {
  getAllRecipes,
  getRecipesByName,
  getRecipeByID,
  postRecipe,
} = require("../controllers/recipesControllers");

const recipeRouter = Router();

recipeRouter.get("/", getAllRecipes);

recipeRouter.get("/name", dataGetNameValidatorMiddleware, getRecipesByName);

recipeRouter.get("/:idRecipe", dataGetIDValidatorMiddleware, getRecipeByID);

recipeRouter.post("/", dataPostValidatorMiddleware, postRecipe);

module.exports = recipeRouter;
