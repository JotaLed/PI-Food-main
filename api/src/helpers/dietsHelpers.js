const axios = require("axios");
const { Diet } = require("../db");
const { API_KEY } = process.env;

async function getAllDietsFromApi() {
  try {
    const dietsFromDB = await getAllDietsFromDB();

    if (dietsFromDB.length === 0) {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      );
      const data = response.data.results;
      const mappedDietsFromApi = data.flatMap((recipe) => recipe.diets);

      const uniqueDietsFromApi = [...new Set(mappedDietsFromApi)];

      const dietsFromApi = uniqueDietsFromApi.map((e) => {
        return { type: e };
      });

      await Diet.bulkCreate(dietsFromApi);
      console.log("Dietas obtenidas desde la API y guardadas en la DB");
    } else {
      console.log("Dietas existentes en la DB");
    }
  } catch (error) {
    console.log("Error al obtener y guardar las dietas:", error.message);
  }
}

async function getAllDietsFromDB() {
  const diets = await Diet.findAll();
  return diets;
}

module.exports = { getAllDietsFromApi, getAllDietsFromDB };
