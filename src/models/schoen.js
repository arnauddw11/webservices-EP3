const mongoose = require('mongoose');
const validator = require('validator');
const { kledingstukModel } = require('./kledingstuk');

const Schema = mongoose.Schema;

const Schoen = (kledingstukModel,{
  schoenmaat: {type: int}
});
const SchoenModel = mongoose.model('Schoen', Schoen); 

module.exports = {
  schoenModel,
};