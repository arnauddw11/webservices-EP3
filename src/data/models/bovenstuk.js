const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Bovenstuk = new Schema({
  name: {
    type: String,

    validate: {
      validator: function (value){
        return value.length >= 3;
      },
      message: 'naam moet minstens 3 karakters hebben',
    },
    required: [true, 'Naam moet ingevuld zijn'],
  },
  dropdate: {
    type: Date,
    required:[true, 'Datum waarop bovenstuk uit is gekomen moet ingevuld zijn'],
  },
  size: {
    type: String,
    validate : {
      validator: function(value){
        // eslint-disable-next-line no-unused-vars
        return value = 'S', 'M', 'L', 'XL', 'XXL';
      },
    },
    requirement: [true, 'Maat moet ingevuld zijn'],
  },
});
const bovenstukModel = mongoose.model('Bovenstuk', Bovenstuk); 

module.exports = {
  bovenstukModel,
};