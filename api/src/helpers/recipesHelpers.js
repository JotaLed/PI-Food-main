const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getRecipesFromDB = async () => {
  const recipesFromDb = await Recipe.findAll({
    include: [
      {
        model: Diet,
        attributes: ["id", "type"],
        through: { attributes: [] },
      },
    ],
  });

  const recipesFromDbFormatted = recipesFromDb.map((recipe) => ({
    id: recipe.id,
    name: recipe.name,
    image: recipe.image,
    summary: recipe.summary,
    healthScore: recipe.healthScore,
    analyzedInstructions: recipe.analyzedInstructions,
    diets: recipe.Diets.map((diet) => diet.type),
    createdInDb: recipe.createdInDb,
  }));

  return recipesFromDbFormatted;
};

const getRecipesFromAPI = async () => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const data = response.data.results;
  const recipesFromApi = data.map((recipe) => ({
    id: recipe.id,
    name: recipe.title,
    image: recipe.image,
    summary: recipe.summary,
    healthScore: recipe.healthScore,
    analyzedInstructions: recipe.analyzedInstructions[0]?.steps.map((step) => ({
      number: step.number,
      step: step.step,
    })),
    diets: recipe.diets,
  }));

  return recipesFromApi;
};

const getRecipeByNameFromDB = async (name) => {
  const recipes = await Recipe.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
  });
  return recipes;
};

const getRecipeByNameFromAPI = async (name) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true`
  );

  const data = response.data.results;
  const recipesFromApi = data.map((recipe) => ({
    id: recipe.id,
    name: recipe.title,
    image: recipe.image,
    summary: recipe.summary,
    healthScore: recipe.healthScore,
    analyzedInstructions: recipe.analyzedInstructions.map((instruction) =>
      instruction.steps.map((step) => ({
        number: step.number,
        step: step.step,
      }))
    ),
    diets: recipe.diets,
  }));

  return recipesFromApi;
};

const getRecipeByIDFromDB = async (id) => {
  const recipe = await Recipe.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
  return recipe ? [recipe] : [];
};

const getRecipeByIDFromAPI = async (id) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );

    const data = response.data;

    const recipeFromApi = {
      id: data.id,
      name: data.title,
      image: data.image,
      summary: data.summary,
      healthScore: data.healthScore,
      analyzedInstructions: data.analyzedInstructions.map((instruction) =>
        instruction.steps.map((step) => ({
          number: step.number,
          step: step.step,
        }))
      ),
      diets: data.diets,
    };

    return recipeFromApi;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []; // Devolver un arreglo vacío cuando no se encuentran coincidencias
    } else {
      throw new Error(
        `Error al obtener la receta por id desde la API: ${error.message}`
      );
    }
  }
};

module.exports = {
  getRecipesFromDB,
  getRecipesFromAPI,
  getRecipeByNameFromDB,
  getRecipeByNameFromAPI,
  getRecipeByIDFromDB,
  getRecipeByIDFromAPI,
};
