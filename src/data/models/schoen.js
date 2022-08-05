const { isNumber } = require('@hapi/joi/lib/common');
const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const Schoen = new Schema({
  name: {
    type: String,

    validate: {
      validator: function (value){
        return value.length >= 3;
      },
      message: 'naam moet minstens 3 karakters hebben'
    },
    required: [true, 'Naam moet ingevuld zijn']
  },
  dropdate: {
    type: Date,
    required:[true, 'Datum waarop schoen uit is gekomen moet ingevuld zijn']
  },
  size: {
    type: Number,
    requirement: [true, 'Maat moet ingevuld zijn']
}});
const schoenModel = mongoose.model('Schoen', Schoen); 

module.exports = {
  schoenModel,
};