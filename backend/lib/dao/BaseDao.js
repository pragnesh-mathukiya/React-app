"use strict";

class BaseDao {
  constructor(dbModel) {
    this.Model = dbModel;
  }

  save(object) {
    return this.Model.create(object);
  }

  findOne(query, projection) {
    return this.Model.findOne(query, projection).exec();
  }

  find(query, projection) {
    return this.Model.find(query, projection).sort({ createdOn: -1 }).exec();
  }

  findOneAndUpdate(query, update, options) {
    if (!options) {
      options = {};
    }
    return this.Model.findOneAndUpdate(query, update, options).exec();
  }

  findAndModify(query, update, options) {
    return this.Model.findAndModify(query, update, options).exec();
  }

  customFind(query, projection, limit, condition) {
    return this.Model.find(query, projection)
      .limit(limit)
      .sort(condition)
      .exec();
  }

  update(query, update, options) {
    if (!options) {
      options = {};
    }
    return this.Model.update(query, update, options).exec();
  }

  updateMany(query, update, options) {
    if (!options) {
      options = {};
    }
    return this.Model.updateMany(query, update, options).exec();
  }

  remove(query, options) {
    return this.Model.remove(query, options).exec();
  }

  findByIdAndRemove(query, options) {
    return this.Model.findByIdAndRemove(query, options).exec();
  }

  aggregate(aggPipe) {
    return this.Model.aggregate(aggPipe).exec();
  }

  findByIdAndUpdate(query, update, options) {
    return this.Model.findByIdAndUpdate(query, update, options).exec();
  }

  findById(query) {
    return this.Model.findById(query).exec();
  }

  count(query) {
    return this.Model.count(query).exec();
  }

  findOneAndDelete(query) {
    return this.Model.findOneAndDelete(query);
  }

  findWithPagination(query, skip, limit) {
    return this.Model.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
  }

  distinct(query) {
    return this.Model.distinct(query).exec();
  }

  findSortingAndLimit(query, condition, limit, projection) {
    return this.Model.find(query, projection)
      .limit(limit)
      .sort(condition)
      .exec();
  }

  findAndSort(query, projection, sort) {
    return this.Model.find(query, projection).sort(sort).exec();
  }

  findOneAndSort(query, projection, sort) {
    return this.Model.findOne(query, projection).sort(sort).exec();
  }

  findSortWithPagination(query, projection, sort, skip, limit) {
    return this.Model.find(query, projection)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }

  insertMany(array) {
    return this.Model.insertMany(array);
  }

  countDocuments(query) {
    return this.Model.find(query).countDocuments().exec();
  }

}

module.exports = BaseDao;
