const mongoose = require('mongoose');
const { ValidateCpf } = require('./validateCpf');

const ContactSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, "No need a name?"],
    trim: true,
    validate: {
      validator: function(value) {
        return /^[ A-Za-zÀ-ú]+$/.test(value);
      },
      message: props => `${props.value} is not a valid name!`
    },
  },
  surname: { 
    type: String,
    required: [true, "No need a surname?"],
    trim: true,
    validate: {
      validator: function(value) {
        return /^[ A-Za-zÀ-ú]+$/.test(value);
      },
      message: props => `${props.value} is not a valid name!`
    },
  },
  email: { 
    type: String,
    lowercase: true,
    required: [true, "Need a e-mail address."],
    trim: true,
    validate: function (value) {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(value);
    },
    message: props => `${props.value} is not a valid e-mail!`
  },
  phone: { 
    type: String,
    required: [true, "No need a phone?"],
    trim: true,
    validate: {
      validator: function(value) {
        return /^[ 0-9]+$/.test(value);
      },
      message: props => `${props.value} is not a valid phone!`
    },
  },
  
  birthday: {
    type: Date,
    trim: true,
    required: [true, "No have birthday?"],
  },
  gender: {
    type: String,
  },
  cpf: {
    type: String,
    trim: true,
    required: true,
    unique: [true, "CPF already registered"],
    validate: function (value){
      const cpfResultado = new ValidateCpf(value);
      if (!cpfResultado.validate()) return false;
      return true;
      },
      message: props => `${props.value} is not a valid CPF number!`
  }
}, {timestamps: true});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = {
  Contact
}