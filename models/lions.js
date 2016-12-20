const mongoose = require('mongoose');

const LionSchema = new mongoose.Schema({
  name : {type: String},
  age : {type: Number},
  pride : {type: String},
  gender : {type: String},
  id : {type: String},
});

Lion = mongoose.model('lion', LionSchema);

module.exports = Lion;
