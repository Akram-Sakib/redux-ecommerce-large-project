class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    ///filter for category and pricing
    const queryCopy = { ...this.queryStr }; ///query str is javascript object
    //removing some fields of category
    const removeFields = ["keyword", "page", "limit"]; ////categories
    removeFields.forEach((key) => delete queryCopy[key]);

    /// price filtering and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); ///price-filtering
    // ----------
    //// below this section work for filter, categories
    this.query = this.query.find(JSON.parse(queryStr));
    console.log(queryStr);
    return this;
    ////this completely done for categories
  }
  // below this section work for pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
