const mongoose = require('mongoose');
const validator = require('validator');
const { kledingstukModel } = require('./kledingstuk');
const extendSchema = require('mongoose-extend-schema');

const Schema = mongoose.Schema;

const Schoen = extendSchema(kledingstukModel,{
  schoenmaat: {
  type: int,
  requirement: [true, 'schoenmaat moet ingevuld zijn']
}});
const schoenModel = mongoose.model('Schoen', Schoen); 

module.exports = {
  schoenModel,
};