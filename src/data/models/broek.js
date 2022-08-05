const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Broek = new Schema ({
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
    required:[true, 'Datum waarop broek uit is gekomen moet ingevuld zijn'],
  },
  size: {
    type: String,
    validate : {
      validator: function(value){
        return value = 'S', 'M', 'L', 'XL', 'XXL';
      },
    },
    requirement: [true, 'Maat moet ingevuld zijn'],
  },
});
const broekModel = mongoose.model('Broek', Broek); 

module.exports = {
  broekModel,
};