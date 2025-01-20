import React from "react";

const Pagination = ({itemsPerPage, length, onPageChange, currentPage}) => {
    const paginationNumbers = [];
    for (let i = 1; i <= Math.ceil(length / itemsPerPage); i++) {
        paginationNumbers.push(i);
    }
    
    const handlePagination = (pageNumber) => {
        onPageChange(pageNumber);
    }

    return (
        <div className='pagination'>
        {paginationNumbers.map((pageNumber) => (
            <button key={pageNumber} onClick={() => handlePagination(pageNumber)}>{pageNumber}</button>
        ))}
        </div>
    );
};
export default Pagination;
  
  