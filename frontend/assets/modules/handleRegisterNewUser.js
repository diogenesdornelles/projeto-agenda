import ValidateCpf from "./ValidateCpf";
import validator from 'validator';
import handleFrontEnd from "./handleFrontEnd";

export default function handleRegisterNewUser(){
  
  const _name = document.querySelector('#new-user-name');
  const _surname = document.querySelector('#new-user-surname');
  const _email = document.querySelector('#new-user-email');
  const _birthday = document.querySelector('#new-user-birthday');
  const _cpf = document.querySelector('#new-user-cpf');
  const _userName = document.querySelector('#new-user-userName');

  const arrayEls = [_name.checkValidity(), _surname.checkValidity(), _email.checkValidity(), _birthday.checkValidity(), _cpf.checkValidity(), _userName.checkValidity()];
  if (arrayEls.includes(false)) return;
  
  const validatorCpf = new ValidateCpf(_cpf.value);
  if (!validatorCpf.validate()) {
    alert('CPF inválido!');
    return;
  };
  
  if (!_name.value) {
    alert('Informar nome!');
    return;
  }
 
  if (!_surname.value) {
    alert('Informar sobrenome!');
    return;
  }
  
  if (!_email.value) {
    alert('Informar email!');
    return;
  }
  
  if (!_birthday.value) {
    alert('Informar data de nascimento!');
    return;
  }
  
  if (!validator.isEmail(_email.value)) {
    alert('Informar e-mail válido!');
    return;
  }
  
  if (_userName.value < 3){
    alert('Nome de usuário deve ter no mínimo 3 caracteres!');
    return;
  }
  
  if (!/^[ A-Za-z0-9]+$/.test(_userName.value)){
    alert('Nome de usuário deve contar letras ou números!');
    return;
  }

  document.querySelector('.register-painel .form').submit();

  handleFrontEnd('register', _userName.value);
}