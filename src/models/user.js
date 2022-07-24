const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const User = new Schema({
  name : {
    type: String,

    //valideer dat naam > 3 char
    validate : {
        validator: function(value) {
          return value.length >= 3;
        },
        message: 'Naam moet minstens 3 karakters hebben'
    },
    required: [true, 'Naam moet ingevuld zijn']
  },

  password : {
    type: String,

    required: [true, 'Password moet ingevuld zijn']
  },
  email: { 
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email is verplicht'],
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      }
    }
  },
  roles: {
    type: String
  },
})
const userModel = mongoose.model('User', User); 

module.exports = {
  userModel,
};