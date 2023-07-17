const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const {
  getRecipesFromDB,
  getRecipesFromAPI,
  getRecipeByNameFromDB,
  getRecipeByNameFromAPI,
  getRecipeByIDFromDB,
  getRecipeByIDFromAPI,
} = require("../helpers/recipesHelpers");

const getAllRecipes = async (req, res) => {
  try {
    const allRecipesFromDB = await getRecipesFromDB();
    const allRecipesFromAPI = await getRecipesFromAPI();
    const allRecipes = [...allRecipesFromDB, ...allRecipesFromAPI];
    res.status(200).send(allRecipes);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getRecipeByID = async (req, res) => {
  try {
    const id = req.params.idRecipe;
    let recipe;

    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id
      )
    ) {
      recipe = await getRecipeByIDFromDB(id);
    } else {
      recipe = await getRecipeByIDFromAPI(id);
    }

    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getRecipesByName = async (req, res) => {
  try {
    const name = req.query.name;
    const recipesDB = await getRecipeByNameFromDB(name);
    const recipesAPI = await getRecipeByNameFromAPI(name);
    const allRecipesByName = [...recipesDB, ...recipesAPI];

    res.status(200).send(allRecipesByName);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const postRecipe = async (req, res) => {
  try {
    const recipeData = req.recipe;
    const idsDiets = req.body.diets;

    const recipeCreated = await Recipe.create(recipeData);

    const dietsFromDB = await Diet.findAll({
      where: {
        id: {
          [Op.in]: idsDiets,
        },
      },
    });

    await recipeCreated.addDiets(dietsFromDB);

    const recipeWithDiets = await Recipe.findByPk(recipeCreated.id, {
      include: [
        {
          model: Diet,
          attributes: ["id", "type"],
          through: { attributes: [] },
        },
      ],
    });

    const recipeWithDietsFormatted = {
      id: recipeWithDiets.id,
      name: recipeWithDiets.name,
      image: recipeWithDiets.image,
      summary: recipeWithDiets.summary,
      healthScore: recipeWithDiets.healthScore,
      analyzedInstructions: recipeWithDiets.analyzedInstructions,
      diets: recipeWithDiets.Diets.map((diet) => diet.type),
      createdInDb: recipeWithDiets.createdInDb,
    };

    res.status(200).send(recipeWithDietsFormatted);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getAllRecipes, getRecipesByName, getRecipeByID, postRecipe };
