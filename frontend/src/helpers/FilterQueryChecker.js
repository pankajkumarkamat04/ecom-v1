const FilterQueryChecker = (searchparams,parmas) => {
  const page = searchparams.get("page");
  const keyword = searchparams.get("keyword");
  const min = searchparams.get("min");
  const max = searchparams.get("max");
  const rating = searchparams.get("rating");
  const category = searchparams.get("category");
  if (searchparams.has("page")) {
    parmas.page = page;
  }
  if (searchparams.has("keyword")) {
    parmas.keyword = keyword;
  }
  if (searchparams.has("page")) {
    parmas.page = page;
  }
  if (searchparams.has("min")) {
    parmas.min = min;
  }
  if (searchparams.has("max")) {
    parmas.max = max;
  }
  if (searchparams.has("category")) {
    parmas.category = category;
  }
  if (searchparams.has("rating")) {
    parmas.rating = rating;
  }
};

export default FilterQueryChecker;
