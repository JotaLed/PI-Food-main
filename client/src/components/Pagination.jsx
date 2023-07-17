import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPaginationCurrentPage } from "../redux/actions";
import styles from "./styles/pagination.module.css";

function Pagination() {
  const totalPages = useSelector((store) => store.pagination.totalPages);
  const currentPage = useSelector((store) => store.pagination.currentPage);
  const dispatch = useDispatch();

  const handleCurrentPage = (page) => {
    dispatch(setPaginationCurrentPage(page));
  };

  const renderPageButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <li key={i} className={currentPage === i ? styles.selectedPage : ""}>
          <button
            onClick={() => handleCurrentPage(i)}
            disabled={currentPage === i}
          >
            {i}
          </button>
        </li>
      );
    }

    return (
      <div className={styles.buttonsContainer}>
        <button
          className={currentPage === 1 ? styles.disabledButton : ""}
          onClick={() => handleCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <ul>{buttons}</ul>
        <button
          className={currentPage === totalPages ? styles.disabledButton : ""}
          onClick={() => handleCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    );
  };

  return (
    <div>
      {totalPages > 1 && (
        <div className={styles.mainContainer}>
          <ul>{renderPageButtons()}</ul>
        </div>
      )}
    </div>
  );
}

export default Pagination;
