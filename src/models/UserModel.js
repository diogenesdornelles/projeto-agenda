const mongoose = require('mongoose');
const { ValidateCpf } = require('./validateCpf');

const UserSchema = new mongoose.Schema({
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
  birthday: {
    type: Date,
    trim: true,
    required: [true, "No have birthday?"],
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
  },
  userName: { 
    type: String,
    required: [true, "No need a user name?"],
    trim: true,
    validate: {
      validator: function(value) {
        return /^[ A-Za-z0-9]+$/.test(value);
      },
      message: props => `${props.value} is not a valid user name!`
    },
    minLength: [4,'Minimun username length 4 characters.'],
    unique: [true, "username already registered"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [6,'Minimun code length 6 characters']
  },
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
}