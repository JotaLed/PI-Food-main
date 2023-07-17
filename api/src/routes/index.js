const recipeRouter = require("./recipeRouter");
const dietRouter = require("./dietRouter");
const { Router } = require("express");

const router = Router();

router.use("/recipes", recipeRouter);
router.use("/diets", dietRouter);

module.exports = router;
