import ValidateCpf from '../ValidateCpf'
import validator from 'validator'
import handleFrontEnd from '../handleFrontEnd'

export default function handleRegisterNewUser () {
  const name = document.querySelector('#new-user-name')
  const surname = document.querySelector('#new-user-surname')
  const email = document.querySelector('#new-user-email')
  const birthday = document.querySelector('#new-user-birthday')
  const cpf = document.querySelector('#new-user-cpf')
  const user = document.querySelector('#new-user-user')
  console.log(name, surname, email, birthday, cpf, user)
  console.log('1')
  const arrayEls = [name.checkValidity(), surname.checkValidity(), email.checkValidity(), birthday.checkValidity(), cpf.checkValidity(), user.checkValidity()]
  if (arrayEls.includes(false)) return
  console.log('2')
  const validatorCpf = new ValidateCpf(cpf.value)
  if (!validatorCpf.validate()) {
    alert('CPF inválido!')
    return
  };
  console.log('3')
  if (!name.value) {
    alert('Informar nome!')
    return
  }
  console.log('4')
  if (!surname.value) {
    alert('Informar sobrenome!')
    return
  }
  console.log('5')
  if (!email.value) {
    alert('Informar email!')
    return
  }
  console.log('6')
  if (!birthday.value) {
    alert('Informar data de nascimento!')
    return
  }
  console.log('7')
  if (!validator.isEmail(email.value)) {
    alert('Informar e-mail válido!')
    return
  }
  console.log('8')
  if (user.value < 3) {
    alert('Nome de usuário deve ter no mínimo 3 caracteres!')
    return
  }
  console.log('9')
  if (!/^[ A-Za-z0-9]+$/.test(user.value)) {
    alert('Nome de usuário deve contar letras ou números!')
    return
  }
  console.log('10')
  document.querySelector('#new-user-form').submit()

  handleFrontEnd('register', user.value)
}
