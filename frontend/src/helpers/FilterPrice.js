import React from "react";
import { useNavigate } from "react-router-dom";

const FilterPrice = (searchparams, key, value) => {
  const hasValue = searchparams.has(key);
  if (hasValue && value) {
    searchparams.set(key, value);
  } else if (value) {
    searchparams.append(key, value);
  } else {
    searchparams.delete(key);
  }
  const path = `${window.location.pathname}?${searchparams.toString()}`;
};

export default FilterPrice;
