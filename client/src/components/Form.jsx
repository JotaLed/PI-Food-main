// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { createRecipe } from "../redux/actions";
// import { Link } from "react-router-dom";
// import image from "../media/food-icon.jpeg";
// import styles from "./styles/form.module.css";

// function Form() {
//   const [userInput, setUserInput] = useState({
//     name: "",
//     summary: "",
//     healthScore: "",
//     newStep: "",
//     analyzedInstructions: [],
//     newDiet: "",
//     diets: [],
//   });

//   const [validationErrors, setValidationErrors] = useState({
//     name: [],
//     summary: [],
//     healthScore: [],
//     newStep: [],
//     newDiet: [],
//   });

//   const diets = useSelector((state) => state.diets);
//   const dispatch = useDispatch();

//   const handleChange = (event) => {
//     const { id, value } = event.target;
//     let errors = [];

//     switch (id) {
//       case "name":
//         if (!/^[A-Za-zñÑ\s]+$/.test(value)) {
//           errors.push("The name can only contain letters and spaces");
//         }
//         if (!/^(?=.*[A-Za-z]{3,})[A-Za-z]+$/.test(value)) {
//           errors.push("The name must contain a minimum of 3 letters");
//         }
//         if (/^[a-z]/.test(value)) {
//           errors.push("The first letter of the name must be capitalized");
//         }
//         break;

//       case "summary":
//         if (!/^[A-Za-zñÑ\s]+$/.test(value)) {
//           errors.push("The summary can only contain letters and spaces");
//         }
//         if (!/^(?=.*[A-Za-z]{3,})[A-Za-z]+$/.test(value)) {
//           errors.push("The summary must contain a minimum of 3 letters");
//         }
//         break;

//       case "healthScore":
//         if (value === "") {
//           errors.push("The healthScore cannot be empty");
//         }
//         if (!/^[0-9]+$/.test(value)) {
//           errors.push("The healthScore can only contain numbers");
//         }
//         if (value < 1 || value > 100) {
//           errors.push("The healthScore must be in the range of 1 to 100");
//         }
//         break;

//       case "newStep":
//         if (!/^(?=.*[A-Za-z]{3,})[A-Za-z]+$/.test(value)) {
//           errors.push("The step must contain a minimum of 3 letters");
//         }
//         break;

//       case "newDiet":
//         if (userInput.diets.includes(value)) {
//           errors.push("The diet has already been included");
//         }
//         break;

//       default:
//         break;
//     }

//     setUserInput((prevState) => ({
//       ...prevState,
//       [id]: value,
//     }));

//     setValidationErrors((prevState) => ({
//       ...prevState,
//       [id]: [...errors],
//     }));
//   };

//   const addStep = () => {
//     if (userInput.newStep === "") {
//       alert("The step cannot be empty");
//     } else if (validationErrors.newStep.length > 0) {
//       alert("Correct the step");
//     } else {
//       setUserInput((prevState) => ({
//         ...prevState,
//         newStep: "",
//         analyzedInstructions: [
//           ...prevState.analyzedInstructions,
//           {
//             number: prevState.analyzedInstructions.length + 1,
//             step: userInput.newStep,
//           },
//         ],
//       }));
//     }
//   };

//   const removeStep = (number) => {
//     setUserInput((prevState) => {
//       const updatedInstructions = prevState.analyzedInstructions
//         .filter((instruction) => instruction.number !== number)
//         .map((instruction, index) => ({
//           ...instruction,
//           number: index + 1,
//         }));

//       return {
//         ...prevState,
//         analyzedInstructions: updatedInstructions,
//       };
//     });
//   };

//   const addDiet = () => {
//     if (userInput.newDiet === "") {
//       alert("Select a diet");
//     } else if (validationErrors.newDiet.length > 0) {
//       alert("Diet already included, please select another");
//     } else {
//       setUserInput((prevState) => ({
//         ...prevState,
//         newDiet: "",
//         diets: [...prevState.diets, userInput.newDiet],
//       }));
//     }
//   };

//   const removeDiet = (number) => {
//     setUserInput((prevState) => ({
//       ...prevState,
//       diets: prevState.diets.filter((dietNumber) => dietNumber !== number),
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (
//       Object.values(validationErrors).every((errors) => errors.length === 0) &&
//       userInput.name !== "" &&
//       userInput.summary !== "" &&
//       userInput.healthScore !== "" &&
//       userInput.analyzedInstructions.length > 0 &&
//       userInput.diets.length > 0
//     ) {
//       const recipeData = {
//         name: userInput.name,
//         image: image,
//         summary: userInput.summary,
//         healthScore: +userInput.healthScore,
//         analyzedInstructions: userInput.analyzedInstructions,
//         diets: userInput.diets.map(Number),
//       };

//       dispatch(createRecipe(recipeData));

//       setUserInput({
//         name: "",
//         summary: "",
//         healthScore: "",
//         newStep: "",
//         analyzedInstructions: [],
//         newDiet: "",
//         diets: [],
//       });
//       setValidationErrors({
//         name: [],
//         summary: [],
//         healthScore: [],
//         newStep: [],
//         newDiet: [],
//       });

//       alert("Recipe created successfully!");
//     } else {
//       alert(
//         "Please correct the validation errors or fill in all fields before submitting."
//       );
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h3>Create a new recipe</h3>

//       <form onSubmit={handleSubmit}>
//         <div className={styles.section}>
//           <div className={styles.section__left}>
//             <label className={styles.labels} htmlFor="name">
//               Name:
//             </label>
//             <input
//               className={styles.inputs}
//               type="text"
//               id="name"
//               name="name"
//               value={userInput.name}
//               onChange={handleChange}
//             />
//             {validationErrors.name.length > 0 &&
//               validationErrors.name.map((error, index) => (
//                 <p key={index} className={styles.error}>
//                   {error}
//                 </p>
//               ))}

//             <label className={styles.label} htmlFor="summary">
//               Summary:
//             </label>
//             <input
//               className={styles.input}
//               type="text"
//               id="summary"
//               name="summary"
//               value={userInput.summary}
//               onChange={handleChange}
//             />
//             {validationErrors.summary.length > 0 &&
//               validationErrors.summary.map((error, index) => (
//                 <p key={index} className={styles.error}>
//                   {error}
//                 </p>
//               ))}

//             <label className={styles.label} htmlFor="healthScore">
//               Healthscore:
//             </label>
//             <input
//               className={styles.input}
//               type="text"
//               id="healthScore"
//               name="healthScore"
//               value={userInput.healthScore}
//               onChange={handleChange}
//             />
//             {validationErrors.healthScore.length > 0 &&
//               validationErrors.healthScore.map((error, index) => (
//                 <p key={index} className={styles.error}>
//                   {error}
//                 </p>
//               ))}
//           </div>

//           <div className={styles.section__right}>
//             <label className={styles.label} htmlFor="newStep">
//               Instructions:
//             </label>
//             <input
//               className={styles.input}
//               type="text"
//               id="newStep"
//               name="newStep"
//               value={userInput.newStep}
//               onChange={handleChange}
//             />
//             {validationErrors.newStep.length > 0 &&
//               validationErrors.newStep.map((error, index) => (
//                 <p key={index} className={styles.error}>
//                   {error}
//                 </p>
//               ))}
//             <button className={styles.button} type="button" onClick={addStep}>
//               Add step
//             </button>
//             {userInput.analyzedInstructions.length > 0 && (
//               <div className={styles.stepContainer}>
//                 {userInput.analyzedInstructions.map((instruction, index) => (
//                   <div key={index} className={styles.step}>
//                     <p>
//                       Step {instruction.number}: {instruction.step}
//                     </p>
//                     <button
//                       className={styles.button}
//                       type="button"
//                       onClick={() => {
//                         removeStep(instruction.number);
//                       }}
//                     >
//                       Delete step
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className={styles.section}>
//           <div className={styles.section__left}>
//             <label className={styles.label} htmlFor="newDiet">
//               Diets:
//             </label>
//             <select
//               className={styles.input}
//               id="newDiet"
//               name="newDiet"
//               value={userInput.newDiet}
//               onChange={handleChange}
//             >
//               <option value="">-Select-</option>
//               {diets.map((diet) => (
//                 <option key={diet.id} value={diet.id}>
//                   {diet.type}
//                 </option>
//               ))}
//             </select>
//             {validationErrors.newDiet.length > 0 &&
//               validationErrors.newDiet.map((error, index) => (
//                 <p key={index} className={styles.error}>
//                   {error}
//                 </p>
//               ))}
//             <button className={styles.button} type="button" onClick={addDiet}>
//               Add diet
//             </button>
//           </div>

//           <div className={styles.section__right}>
//             {userInput.diets.length > 0 && (
//               <div className={styles.dietContainer}>
//                 {userInput.diets.map((dietId, index) => {
//                   const diet = diets.find((item) => item.id === +dietId);
//                   return (
//                     <div key={index} className={styles.diet}>
//                       <p>{diet.type}</p>
//                       <button
//                         className={styles.button}
//                         type="button"
//                         onClick={() => removeDiet(dietId)}
//                       >
//                         Remove diet
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         <button className={styles.button} type="submit">
//           Create recipe
//         </button>
//       </form>

//       <Link to="/home">
//         <button className={`${styles.button} ${styles.bottom}`}>Home</button>
//       </Link>
//     </div>
//   );
// }

// export default Form;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRecipe } from "../redux/actions";
import { Link } from "react-router-dom";
import image from "../media/food-icon.jpeg";
import styles from "./styles/form.module.css";

function Form() {
  const [userInput, setUserInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    newStep: "",
    analyzedInstructions: [],
    newDiet: "",
    diets: [],
  });

  const [validationErrors, setValidationErrors] = useState({
    name: [],
    summary: [],
    healthScore: [],
    newStep: [],
    newDiet: [],
  });

  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { id, value } = event.target;
    let errors = [];

    switch (id) {
      case "name":
        if (!/^[A-Za-zñÑ\s]+$/.test(value)) {
          errors.push("The name can only contain letters and spaces");
        }
        if (!/^(?=.*[A-Za-z]{3,})[A-Za-z]+$/.test(value)) {
          errors.push("The name must contain a minimum of 3 letters");
        }
        if (/^[a-z]/.test(value)) {
          errors.push("The first letter of the name must be capitalized");
        }
        break;

      case "summary":
        if (!/^[A-Za-zñÑ\s]+$/.test(value)) {
          errors.push("The summary can only contain letters and spaces");
        }
        if (!/^(?=.*[A-Za-z]{3,})[A-Za-z]+$/.test(value)) {
          errors.push("The summary must contain a minimum of 3 letters");
        }
        break;

      case "healthScore":
        if (value === "") {
          errors.push("The healthScore cannot be empty");
        }
        if (!/^[0-9]+$/.test(value)) {
          errors.push("The healthScore can only contain numbers");
        }
        if (value < 1 || value > 100) {
          errors.push("The healthScore must be in the range of 1 to 100");
        }
        break;

      case "newStep":
        if (!/^(?=.*[A-Za-z]{3,})[A-Za-z\s]+$/.test(value)) {
          errors.push("The step must contain a minimum of 3 letters");
        }
        break;

      case "newDiet":
        if (userInput.diets.includes(value)) {
          errors.push("The diet has already been included");
        }
        break;

      default:
        break;
    }

    setUserInput((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    setValidationErrors((prevState) => ({
      ...prevState,
      [id]: [...errors],
    }));
  };

  const addStep = () => {
    if (userInput.newStep === "") {
      alert("The step cannot be empty");
    } else if (validationErrors.newStep.length > 0) {
      alert("Correct the step");
    } else {
      setUserInput((prevState) => ({
        ...prevState,
        newStep: "",
        analyzedInstructions: [
          ...prevState.analyzedInstructions,
          {
            number: prevState.analyzedInstructions.length + 1,
            step: userInput.newStep,
          },
        ],
      }));
    }
  };

  const removeStep = (number) => {
    setUserInput((prevState) => {
      const updatedInstructions = prevState.analyzedInstructions
        .filter((instruction) => instruction.number !== number)
        .map((instruction, index) => ({
          ...instruction,
          number: index + 1,
        }));

      return {
        ...prevState,
        analyzedInstructions: updatedInstructions,
      };
    });
  };

  const addDiet = () => {
    if (userInput.newDiet === "") {
      alert("Select a diet");
    } else if (validationErrors.newDiet.length > 0) {
      alert("Diet already included, please select another");
    } else {
      setUserInput((prevState) => ({
        ...prevState,
        newDiet: "",
        diets: [...prevState.diets, userInput.newDiet],
      }));
    }
  };

  const removeDiet = (number) => {
    setUserInput((prevState) => ({
      ...prevState,
      diets: prevState.diets.filter((dietNumber) => dietNumber !== number),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      Object.values(validationErrors).every((errors) => errors.length === 0) &&
      userInput.name !== "" &&
      userInput.summary !== "" &&
      userInput.healthScore !== "" &&
      userInput.analyzedInstructions.length > 0 &&
      userInput.diets.length > 0
    ) {
      const recipeData = {
        name: userInput.name,
        image: image,
        summary: userInput.summary,
        healthScore: +userInput.healthScore,
        analyzedInstructions: userInput.analyzedInstructions,
        diets: userInput.diets.map(Number),
      };

      dispatch(createRecipe(recipeData));

      setUserInput({
        name: "",
        summary: "",
        healthScore: "",
        newStep: "",
        analyzedInstructions: [],
        newDiet: "",
        diets: [],
      });
      setValidationErrors({
        name: [],
        summary: [],
        healthScore: [],
        newStep: [],
        newDiet: [],
      });

      alert("Recipe created successfully!");
    } else {
      alert(
        "Please correct the validation errors or fill in all fields before submitting."
      );
    }
  };

  return (
    <div>
      <div>
        <h3>Create a new recipe</h3>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.buttons}>
            <div>
              <Link to="/home">
                <button className={`${styles.button} ${styles.bottom}`}>
                  Home
                </button>
              </Link>
            </div>

            <div>
              <button className={styles.button} type="submit">
                Create recipe
              </button>
            </div>
          </div>
          <hr />

          <div className={styles.principalSection}>
            <div className={styles.sectionOne}>
              <label htmlFor="name">Name:</label>
              <input
                className={styles.inputs}
                type="text"
                id="name"
                name="name"
                value={userInput.name}
                onChange={handleChange}
              />
              {validationErrors.name.length > 0 &&
                validationErrors.name.map((error, index) => (
                  <p key={index} className={styles.error}>
                    {error}
                  </p>
                ))}

              <label htmlFor="summary">Summary:</label>
              <input
                className={styles.inputs}
                type="text"
                id="summary"
                name="summary"
                value={userInput.summary}
                onChange={handleChange}
              />
              {validationErrors.summary.length > 0 &&
                validationErrors.summary.map((error, index) => (
                  <p key={index} className={styles.error}>
                    {error}
                  </p>
                ))}

              <label className={styles.labels} htmlFor="healthScore">
                Healthscore:
              </label>
              <input
                className={styles.inputs}
                type="text"
                id="healthScore"
                name="healthScore"
                value={userInput.healthScore}
                onChange={handleChange}
              />
              {validationErrors.healthScore.length > 0 &&
                validationErrors.healthScore.map((error, index) => (
                  <p key={index} className={styles.error}>
                    {error}
                  </p>
                ))}
            </div>

            <div className={styles.sectionTwo}>
              <label className={styles.labels} htmlFor="newStep">
                Instructions:
              </label>
              <input
                className={styles.inputs}
                type="text"
                id="newStep"
                name="newStep"
                value={userInput.newStep}
                onChange={handleChange}
              />
              <button className={styles.button} type="button" onClick={addStep}>
                Add step
              </button>
              {validationErrors.newStep.length > 0 &&
                validationErrors.newStep.map((error, index) => (
                  <p key={index} className={styles.error}>
                    {error}
                  </p>
                ))}
              {userInput.analyzedInstructions.length > 0 && (
                <div className={styles.stepContainer}>
                  {userInput.analyzedInstructions.map((instruction, index) => (
                    <div key={index} className={styles.step}>
                      <p>
                        Step {instruction.number}: {instruction.step}
                      </p>
                      <button
                        className={styles.button}
                        type="button"
                        onClick={() => {
                          removeStep(instruction.number);
                        }}
                      >
                        Delete step
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.sectionThree}>
              <label className={styles.labels} htmlFor="newDiet">
                Diets:
              </label>
              <select
                className={styles.inputs}
                id="newDiet"
                name="newDiet"
                value={userInput.newDiet}
                onChange={handleChange}
              >
                <option value="">-Select-</option>
                {diets.map((diet) => (
                  <option key={diet.id} value={diet.id}>
                    {diet.type}
                  </option>
                ))}
              </select>
              <button className={styles.button} type="button" onClick={addDiet}>
                Add diet
              </button>
              {validationErrors.newDiet.length > 0 &&
                validationErrors.newDiet.map((error, index) => (
                  <p key={index} className={styles.error}>
                    {error}
                  </p>
                ))}
              {userInput.diets.length > 0 && (
                <div className={styles.dietContainer}>
                  {userInput.diets.map((dietId, index) => {
                    const diet = diets.find((item) => item.id === +dietId);
                    return (
                      <div key={index} className={styles.diet}>
                        <p>{diet.type}</p>
                        <button
                          className={styles.button}
                          type="button"
                          onClick={() => removeDiet(dietId)}
                        >
                          Remove diet
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
