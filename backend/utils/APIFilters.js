class APIFilter {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    let keyowrd = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyowrd });
    return this;
  }
  filters() {
    const querycopy = { ...this.queryStr };
    const removeElement = ["keyword", "page"];
    removeElement.forEach((element) => {
      delete querycopy[element];
    });
    let queryStr = JSON.stringify(querycopy);
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);
    this.query = this.query.find({ ...queryStr });
    return this;
  }
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilter;
