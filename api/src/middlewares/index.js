const { getAllDietsFromDB } = require("../helpers/dietsHelpers");

const dataPostValidatorMiddleware = async (req, res, next) => {
  const diets = await getAllDietsFromDB();

  const props = [
    { name: "name", type: "string", required: true },
    { name: "image", type: "string", required: true },
    { name: "summary", type: "string", required: true },
    { name: "healthScore", type: "number", required: true },
    { name: "analyzedInstructions", type: "array", required: true },
    { name: "diets", type: ["number", "array"], required: true },
  ];

  const errors = [];

  for (const prop of props) {
    if (!req.body.hasOwnProperty(prop.name) && prop.required) {
      errors.push(`La propiedad '${prop.name}' es requerida.`);
    } else {
      const value = req.body[prop.name];

      if (Array.isArray(prop.type)) {
        if (!Array.isArray(value) || value.length === 0) {
          errors.push(
            `La propiedad '${prop.name}' debe ser un array con al menos un elemento.`
          );
        } else {
          const maxAllowedIds = diets.length;
          const invalidIds = value.filter(
            (id) =>
              !Number.isInteger(id) ||
              id < 1 ||
              id > maxAllowedIds ||
              !diets.some((diet) => diet.id === id)
          );

          if (invalidIds.length > 0) {
            let errorMessage = `El array '${
              prop.name
            }' contiene IDs inválidos: ${invalidIds.join(", ")}.`;
            if (maxAllowedIds > 0) {
              errorMessage += ` El rango permitido es de 1 a ${maxAllowedIds}.`;
            }
            errors.push(errorMessage);
          }
        }
      } else if (prop.type === "array") {
        if (!Array.isArray(value) || value.length === 0) {
          errors.push(
            `La propiedad '${prop.name}' debe ser un array con al menos un elemento.`
          );
        } else {
          const invalidObjects = value.filter(
            (obj) =>
              typeof obj !== "object" ||
              !obj.hasOwnProperty("number") ||
              !obj.hasOwnProperty("step")
          );

          if (invalidObjects.length > 0) {
            errors.push(
              `Los objetos en '${prop.name}' deben tener las propiedades 'number' y 'step'.`
            );
          }
        }
      } else if (typeof value !== prop.type) {
        errors.push(
          `La propiedad '${prop.name}' debe ser de tipo '${prop.type}'.`
        );
      } else if (prop.type === "string" && value.trim() === "") {
        errors.push(`La propiedad '${prop.name}' no puede estar vacía.`);
      } else if (prop.name === "healthScore" && (value < 1 || value > 100)) {
        errors.push(
          `La propiedad '${prop.name}' debe estar en el rango de 1 a 100.`
        );
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "La solicitud contiene errores de validación.",
      errors: errors,
    });
  }

  const recipe = {
    name: req.body.name,
    image: req.body.image,
    summary: req.body.summary,
    healthScore: req.body.healthScore,
    analyzedInstructions: req.body.analyzedInstructions,
  };

  req.recipe = recipe;

  next();
};

const dataGetIDValidatorMiddleware = (req, res, next) => {
  const id = req.params.idRecipe;

  if (!isNaN(id) && Number.isInteger(Number(id))) {
    // ID es un número entero
    if (id < 1 || id > 100) {
      return res.status(400).json({
        message: "El ID proporcionado debe estar en el rango de 1 a 100.",
      });
    }
  } else if (!id.match(/^(?=.*[0-9a-fA-F-])[0-9a-fA-F-]{36}$/)) {
    // ID no es un UUIDv4 válido
    return res.status(400).json({
      message: "El ID proporcionado no es un UUIDv4 válido.",
    });
  }

  next();
};

const dataGetNameValidatorMiddleware = (req, res, next) => {
  const name = req.query.name;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      message: "El nombre proporcionado en la consulta no puede estar vacío.",
    });
  }

  if (!/^[a-zA-ZñÑ\s]+$/.test(name)) {
    return res.status(400).json({
      message:
        "El nombre proporcionado en la consulta solo puede contener letras y espacios.",
    });
  }

  next();
};

module.exports = {
  dataPostValidatorMiddleware,
  dataGetIDValidatorMiddleware,
  dataGetNameValidatorMiddleware,
};
