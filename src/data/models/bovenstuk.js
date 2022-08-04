const mongoose = require('mongoose');
const validator = require('validator');
const { kledingstukModel } = require('./kledingstuk');
const extendSchema = require('mongoose-extend-schema');


const Schema = mongoose.Schema;

const Bovenstuk = extendSchema(kledingstukModel,{
  size: {
  type: String,
  validate : {
    validator: function(value){
      return value = 'S', 'M', 'L', 'XL';
    }
  },
  requirement: [true, 'Maat moet ingevuld zijn']
}
});
const bovenstukModel = mongoose.model('Bovenstuk', Bovenstuk); 

module.exports = {
  bovenstukModel,
};