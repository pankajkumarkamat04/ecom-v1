import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProductSearch = () => {
  let [keyword, setKeyword] = useState("");
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (searchparams.has("keyword")) {
      setKeyword(searchparams.get("keyword"));
    } else {
      setKeyword("");
    }
  }, []);
  const handleChange = (e) => {
    setKeyword(e.target.value);
    console.log(e.target.value);
    if (e.target.value == "") {
      if (searchparams.has("keyword")) {
        searchparams.delete("keyword");
      }
    }
  };
  const btnSubmit = (e) => {
    e.preventDefault();
    if (keyword !== "") {
      if (searchparams.has("keyword")) {
        searchparams.set("keyword", keyword);
      } else {
        searchparams.append("keyword", keyword);
      }
    }
    const path = `${window.location.pathname}?${searchparams.toString()}`;
    navigate(path);
  };
  return (
    <form className="d-flex col-md-4" role="search" onSubmit={btnSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={keyword}
        onChange={handleChange}
      />
      <button className="btn btn-outline-primary" type="submit">
        Search
      </button>
    </form>
  );
};

export default ProductSearch;
