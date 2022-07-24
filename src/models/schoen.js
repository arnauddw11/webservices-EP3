const mongoose = require('mongoose');
const validator = require('validator');
const { kledingstukModel } = require('./kledingstuk');

const Schema = mongoose.Schema;

const Schoen = new Schema (kledingstukModel,{
  schoenmaat: {
  type: int,
  requirement: [true, 'schoenmaat moet ingevuld zijn']
}});
const schoenModel = mongoose.model('Schoen', Schoen); 

module.exports = {
  schoenModel,
};