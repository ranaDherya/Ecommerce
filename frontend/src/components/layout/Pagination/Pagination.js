import React from "react";
import usePagination from "./usePagination";

function Pagination(props) {
  const {
    onPageChange,
    totalCount,
    siblingCount,
    currentPage,
    pageSize,
    linkClassName,
    itemClassName,
    prevPageText,
    nextPageText,
    activeLinkClass,
    activeItemClass,
  } = props;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  if (!paginationRange) return;

  // If there are less than 2 times in pagination range we shall not render the component
  //   if (currentPage === 0 || paginationRange.length < 2) {
  //     return null;
  //   }

  const onNext = () => {
    if (paginationRange[paginationRange.length - 1] === currentPage) return;
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="pagination">
      {/* Left navigation  */}
      <li
        className={`${itemClassName} ${
          currentPage === 1 ? "disabled-pagination" : ""
        }`}
        onClick={onPrevious}
        key="<"
      >
        <p className={linkClassName}>{prevPageText ? prevPageText : "<"}</p>
      </li>

      {paginationRange.map((pageNumber) => {
        if (pageNumber === "...") {
          return (
            <li
              className={`${itemClassName} pagination-item-dots`}
              key={Math.random()}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={`${itemClassName} ${
              pageNumber === currentPage ? activeItemClass : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
          >
            <p
              className={`${linkClassName} ${
                pageNumber === currentPage ? activeLinkClass : ""
              }`}
            >
              {pageNumber}
            </p>
          </li>
        );
      })}
      {/* Right Navigation arrow */}
      <li
        className={`${itemClassName} ${
          currentPage === lastPage ? "disabled-pagination" : ""
        }`}
        onClick={onNext}
        key=">"
      >
        <p className={linkClassName}>{nextPageText ? nextPageText : ">"}</p>
      </li>
    </ul>
  );
}

export default Pagination;
