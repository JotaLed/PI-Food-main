import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeFilterByDietTypes,
  changeFilterByOrigin,
  changeOrderByName,
  changeOrderByHealtScore,
} from "../redux/actions";
import styles from "./styles/filterAndOrders.module.css";

function FiltersAndOrderers() {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  const handleChange = (event, select) => {
    switch (select) {
      case "dietType":
        return dispatch(changeFilterByDietTypes(event.target.value));
      case "origin":
        return dispatch(changeFilterByOrigin(event.target.value));
      case "alphabet":
        return dispatch(changeOrderByName(event.target.value));
      case "healtscore":
        return dispatch(changeOrderByHealtScore(event.target.value));
      default:
        console.log("");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.selectsDivs}>
        {/* <p>Filter by diet type</p> */}
        <select
          className={styles.selects}
          onChange={(event) => {
            handleChange(event, "dietType");
          }}
        >
          <option value="">Filter by diet type</option>
          {diets.map((diet) => (
            <option key={diet.id} value={diet.type}>
              {diet.type}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.selectsDivs}>
        {/* <p>Filter by origin</p> */}
        <select
          className={styles.selects}
          onChange={(event) => {
            handleChange(event, "origin");
          }}
        >
          <option value="">Filter by origin</option>
          <option value="db">database</option>
          <option value="api">external API</option>
        </select>
      </div>

      <div className={styles.selectsDivs}>
        {/* <p>Order by alphabet</p> */}
        <select
          className={styles.selects}
          onChange={(event) => {
            handleChange(event, "alphabet");
          }}
        >
          <option value="">Order by alphabet</option>
          <option value="descendent">descesdent</option>
          <option value="ascendent">ascendent</option>
        </select>
      </div>

      <div className={styles.selectsDivs}>
        {/* <p>Order by healtscore</p> */}
        <select
          className={styles.selects}
          onChange={(event) => {
            handleChange(event, "healtscore");
          }}
        >
          <option value="">Order by healtscore</option>
          <option value="descendent">descesdent</option>
          <option value="ascendent">ascendent</option>
        </select>
      </div>
    </div>
  );
}

export default FiltersAndOrderers;
