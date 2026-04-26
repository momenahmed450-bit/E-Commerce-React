import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
   
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) return null;

    return (
        <nav style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
              
                <li>
                    <button 
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={buttonStyle}>
                        السابق
                    </button>
                </li>

             
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button 
                            onClick={() => onPageChange(number)}
                            style={{
                                ...buttonStyle,
                                backgroundColor: currentPage === number ? '#007bff' : '#fff',
                                color: currentPage === number ? '#fff' : '#000',
                                fontWeight: currentPage === number ? 'bold' : 'normal'
                            }}>
                            {number}
                        </button>
                    </li>
                ))}

              
                <li>
                    <button 
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={buttonStyle}>
                        التالي
                    </button>
                </li>
            </ul>
        </nav>
    );
};


const buttonStyle = {
    padding: '8px 12px',
    margin: '0 5px',
    cursor: 'pointer',
    border: '1px solid #ddd',
    borderRadius: '4px',
    transition: '0.3s'
};

export default Pagination;