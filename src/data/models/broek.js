const mongoose = require('mongoose');
const validator = require('validator');
const { kledingstukModel } = require('./kledingstuk');
const extendSchema = require('mongoose-extend-schema');

const Schema = mongoose.Schema;

const Broek = extendSchema (kledingstukModel,{
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
const broekModel = mongoose.model('Broek', Broek); 

module.exports = {
  broekModel,
};