const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const Kledingstuk = new Schema({
  id: {
    type: String,
    required: [true, 'id moet ingevuld zijn'],
  },
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
    required:[true, 'Datum waarop kledingstuk uit is gekomen moet ingevuld zijn']
  },
})
const kledingstukModel = mongoose.model('Kledingstuk', Kledingstuk); 

module.exports = {
  kledingstukModel,
};