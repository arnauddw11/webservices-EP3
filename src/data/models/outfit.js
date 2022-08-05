const mongoose = require('mongoose');
const validator = require('validator');


const Schema = mongoose.Schema;

const Outfit = new Schema({
  bovenstukId: {
    type: String,

    validate: {
      validator: function (value){
        return value.length >= 24;
      },
      message: 'bovenstukId moet minstens 24 karakters hebben'
    },
    required: [true, 'bovenstukId moet ingevuld zijn']
  },
  broekId: {
    type: String,

    validate: {
      validator: function (value){
        return value.length >= 24;
      },
      message: 'broekId moet minstens 24 karakters hebben'
    },
    required: [true, 'broekId moet ingevuld zijn']
  },
  schoenId: {
    type: String,

    validate: {
      validator: function (value){
        return value.length >= 24;
      },
      message: 'schoenId moet minstens 24 karakters hebben'
    },
    required: [true, 'schoenId moet ingevuld zijn']
  },
});
const outfitModel = mongoose.model('Outfit', Outfit); 

module.exports = {
  outfitModel,
};