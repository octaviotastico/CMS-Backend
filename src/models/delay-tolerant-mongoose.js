let dt_mongoose = require('mongoose');

dt_mongoose.Model.dt_find = function (params) {
  console.log('TESTING FIND', params);
  return this.find(params);
}

dt_mongoose.Model.dt_create = function (data) {
  console.log('------> DELAY TOLERANT SAVE', data);
  console.log("---> Saving in", this.modelName);

  return this.create(data);
}

module.exports = dt_mongoose;