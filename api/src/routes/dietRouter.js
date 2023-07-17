const { Router } = require("express");
const getDiets = require("../controllers/dietsControllers");

const dietRouter = Router();

dietRouter.get("/", getDiets);

module.exports = dietRouter;
