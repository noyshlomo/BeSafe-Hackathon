import React from "react";
import styles from "./Pagination.module.css"

const Pagination = ({itemsPerPage, length, onPageChange, currentPage}) => {
    const paginationNumbers = [];
    for (let i = 1; i <= Math.ceil(length / itemsPerPage); i++) {
        paginationNumbers.push(i);
    }
    
    const handlePagination = (pageNumber) => {
        onPageChange(pageNumber);
    }

    return (
        <div className={styles.pagination}>
            <button disabled={currentPage === 1 ? true : false} onClick={() => handlePagination(currentPage-1)}>
                &lt;&lt;
            </button>

            {paginationNumbers.map((pageNumber) => (
                <button key={pageNumber} onClick={() => handlePagination(pageNumber)}>{pageNumber}</button>
            ))}
            
            <button disabled={currentPage === paginationNumbers.length ? true : false} onClick={() => handlePagination(currentPage+1)}>
            &gt;&gt;
            </button>

        </div>
    );
};
export default Pagination;
  
  