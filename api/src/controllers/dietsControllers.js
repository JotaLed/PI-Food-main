const { getAllDietsFromDB } = require("../helpers/dietsHelpers");

const getDiets = async (req, res) => {
  try {
    const diets = await getAllDietsFromDB();
    res.status(200).send(diets);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = getDiets;
