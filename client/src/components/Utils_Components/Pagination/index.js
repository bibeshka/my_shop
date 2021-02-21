import React from "react";
import "./style.scss";

export default function Pagination({ page, setPage, lastPage }) {
  const adjustPage = (amount) => {
    setPage((prevPage) => prevPage + amount);
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        {page !== 1 && (
          <button onClick={() => adjustPage(-1)} className="pagination__prev">
            <i className="fas fa-chevron-left"></i>
          </button>
        )}
        {page !== 1 && (
          <button onClick={() => setPage(1)} className="pagination__first">
            1
          </button>
        )}
        {page > 2 && <div className="pagination__dots">...</div>}
        {page > 2 && (
          <button
            className="pagination__prev-number"
            onClick={() => adjustPage(-1)}
          >
            {page - 1}
          </button>
        )}
        <button className="pagination__current">{page}</button>
        {page < lastPage && (
          <button
            className="pagination__next-number"
            onClick={() => adjustPage(1)}
          >
            {page + 1}
          </button>
        )}
        {page < lastPage && (
          <button onClick={() => adjustPage(1)} className="pagination__next">
            <i className="fas fa-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
}
