class ApiFeatures {
  constructor(query, mongooseQuery) {
    this.query = query;
    this.mongooseQuery = mongooseQuery;
  }

  //search
  search(Model) {
    if (this.query.keyword) {
      let filter = {};
      const keyword = this.query.keyword;
      if (Model === 'products') {
        filter.$or = [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ];
      } else {
        filter.$or = [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ];
      }
      this.mongooseQuery = this.mongooseQuery.find(filter);
    }
    return this;
  }
  //paginate
  paginate() {
    let paginationResult = {};
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 10;
    const skip = limit * (page - 1);
    paginationResult.page = page;
    paginationResult.limit = limit;
    this.paginate = paginationResult;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
  // filtration
  filter() {
    const excluded = ['fields', 'limit', 'sort', 'page', 'keyword'];
    const strQuery = { ...this.query };
    excluded.forEach((el) => delete strQuery[el]);

    this.mongooseQuery = this.mongooseQuery.find(strQuery);
    return this;
  }

  //sort
  sort() {
    if (this.query.sort) {
      const sortQuery = this.query.sort.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.sort(sortQuery);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    }
    return this;
  }

  //fields
  fields() {
    if (this.query.fields) {
      const fieldsQuery = this.query.fields.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.select(fieldsQuery);
    } else {
      this.mongooseQuery = this.mongooseQuery.select('-__v');
    }
    return this;
  }
}

export default ApiFeatures;
