import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  searchRecipesByName,
  clearSearchRecipesByName,
} from "../redux/actions";
import { Link } from "react-router-dom";
import styles from "./styles/search.module.css";

function Search() {
  const [inputState, setInputState] = useState("");
  const [errorState, setErrorState] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const value = event.target.value;
    setInputState(value);

    if (!/^(?=.*[A-Za-zñÑ]{3,})[A-Za-zñÑ ]+$/.test(value)) {
      setErrorState(true);
    } else {
      setErrorState(false);
    }
  };

  const handleSearch = () => {
    if (inputState === "") {
      alert("Empty search cannot be performed");
    } else if (!errorState) {
      dispatch(searchRecipesByName(inputState));
    }
  };

  const handleClear = () => {
    setInputState("");
    dispatch(clearSearchRecipesByName());
  };

  // return (
  //   <div className={styles.searchBarContainer}>
  //     <div className={styles.searchContainer}>
  //       {/* <p>Search recipe</p> */}
  //       <input
  //         className={styles.inputs}
  //         type="text"
  //         value={inputState}
  //         onChange={handleChange}
  //         placeholder="Search recipe by name"
  //       />
  //       {errorState && (
  //         <p>
  //           The name must contain only letters and have a minimum length of 3
  //           letters
  //         </p>
  //       )}
  //       <div>
  //         <button className={styles.buttons} onClick={handleSearch}>
  //           Search
  //         </button>
  //         <button className={styles.buttons} onClick={handleClear}>
  //           Clear
  //         </button>
  //       </div>
  //     </div>

  //     <div className={styles.createContainer}>
  //       {/* <p>Create a new recipe</p> */}
  //       <Link to="/create">
  //         <button className={styles.buttons}>Create a new recipe</button>
  //       </Link>
  //     </div>
  //   </div>
  // );

  return (
    <div className={styles.searchBarContainer}>
      <input
        className={styles.inputs}
        type="text"
        value={inputState}
        onChange={handleChange}
        placeholder="Search recipe by name"
      />
      {errorState && (
        <p>
          The name must contain only letters and have a minimum length of 3
          letters
        </p>
      )}

      <button className={styles.buttons} onClick={handleSearch}>
        Search
      </button>
      <button className={styles.buttons} onClick={handleClear}>
        Clear
      </button>

      <Link to="/create">
        <button className={styles.buttons}>Create a new recipe</button>
      </Link>
    </div>
  );
}

export default Search;
