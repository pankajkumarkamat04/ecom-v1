import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

const CustomPagination = ({ ProductCount, resPerPage }) => {
  const [curPage, setCurPage] = useState();

  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchparams.get("page");

  useEffect(() => {
    if (searchparams.has("page")) {
      setCurPage(Number(page))
    }
  } , [])


  const curPageChange = (pageNo) => {
    setCurPage(pageNo);
    if (searchparams.has("page")) {
      searchparams.set("page", pageNo);
    } else {
      searchparams.append("page", pageNo);
    }
    const path = `${window.location.pathname}?${searchparams.toString()}`;
    navigate(path);
  };

  return (
    <div className="d-flex justify-content-center">
      {resPerPage < ProductCount && (
        <Pagination
          activePage={curPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={ProductCount}
          onChange={curPageChange}
          prevPageText={"Prev"}
          nextPageText={"Next"}
          lastPageText={"Last"}
          firstPageText={"First"}
          linkClass="page-link"
          itemClass="page-item"
        />
      )}
    </div>
  );
};

export default CustomPagination;
