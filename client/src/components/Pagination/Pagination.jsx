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
    <button 
        disabled={currentPage === 1}
        onClick={() => handlePagination(currentPage-1)}
    >
        &lt;&lt;
    </button>

    {paginationNumbers.map((pageNumber) => (
        <button 
            key={pageNumber} 
            onClick={() => handlePagination(pageNumber)}
            className={currentPage === pageNumber ? styles.active : ''}
        >
            {pageNumber}
        </button>
    ))}
    
    <button 
        disabled={currentPage === paginationNumbers.length}
        onClick={() => handlePagination(currentPage+1)}
    >
        &gt;&gt;
    </button>
</div>
    );
};

Pagination.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default Pagination;
  
  