const mongoose = require('mongoose');
const validator = require('validator');
const { kledingstukModel } = require('./kledingstuk');

const Schema = mongoose.Schema;

const Broek = new Schema (kledingstukModel,{
  maat: {
  type: Char,
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