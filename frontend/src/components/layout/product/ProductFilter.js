import React, { useEffect, useState } from "react";
import Starrating from "react-star-ratings";
import FilterPrice from "../../../helpers/FilterPrice";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCategory from "../../../helpers/ProductCategory";

const ProductFilter = () => {
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const handle_btn = (e) => {
    e.preventDefault();
    FilterPrice(searchparams, "min", min);
    FilterPrice(searchparams, "max", max);
    const path = `${window.location.pathname}?${searchparams.toString()}`;
    navigate(path);
  };

  useEffect(() => {
    if (searchparams.has("min")) setMin(searchparams.get("min"));
    if (searchparams.has("max")) setMax(searchparams.get("max"));
  }, []);

  const categoryHandler = (checkbox) => {
    let checkboxs = document.getElementsByName(checkbox.name);
    checkboxs.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked == true) {
      if (searchparams.has("category")) {
        searchparams.set("category", checkbox.value);
      } else {
        searchparams.append("category", checkbox.value);
      }
    } else {
      searchparams.delete("category");
    }
    const path = `${window.location.pathname}?${searchparams.toString()}`;
    navigate(path);
  };
  const defaultChecked = (valuetype,value) => {
    const hasCatgory = searchparams.get(valuetype);
    if (hasCatgory == value) return true;
    return false;
  };
  const reviewHandler = (rating) => {
    const ratings = document.getElementsByName(rating.name);
    ratings.forEach((item) => {
      if (item !== rating) item.checked = false;
    });

    if (rating.checked == true) {
      if (searchparams.has("rating")) {
        searchparams.set("rating", rating.value);
      } else {
        searchparams.append("rating", rating.value);
      }
    } else {
      searchparams.delete("rating");
    }
    const path = `${window.location.pathname}?${searchparams.toString()}`;
    navigate(path);
  };

  return (
    <div>
      <div>
        <form onSubmit={handle_btn} className="d-flex">
          <input
            className="form-control"
            type="number"
            placeholder="$100"
            name="min"
            id="pricemin"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            className="form-control"
            placeholder="$100"
            type="number"
            name="max"
            id="pricemax"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Go
          </button>
        </form>
      </div>
      <hr></hr>
      <div>
        {ProductCategory.map((category) => (
          <div className="d-block" key={category}>
            <input
              type="checkbox"
              name="category"
              defaultChecked={defaultChecked("category",category)}
              onClick={(e) => categoryHandler(e.target)}
              id={`product-${category}`}
              value={category}
            />
            <label htmlFor={`product-${category}`}>{category}</label>
          </div>
        ))}
      </div>
      <hr></hr>
      <div>
        {[4, 3, 2].map((rating) => [
          <div className="d-block" key={rating}>
            <input
              type="checkbox"
              name="rating"
              id={`rating-${rating}`}
              defaultChecked={defaultChecked("rating",rating)}
              onClick={(e) => reviewHandler(e.target)}
              value={rating}
            />
            <label htmlFor={`rating-${rating}`}>
              <Starrating
                rating={rating}
                starRatedColor="#E6432F"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
            </label>
          </div>,
        ])}
      </div>
    </div>
  );
};

export default ProductFilter;
