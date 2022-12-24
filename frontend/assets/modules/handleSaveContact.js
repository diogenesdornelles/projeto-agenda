import handleFrontEnd from "./handleFrontEnd";
import validator from 'validator';
import ValidateCpf from "./ValidateCpf";

export default function handleSaveContact() {
 
  const _csrf = document.querySelector('.header-table ._csrf');
  const _name = document.querySelector('#contact-name');
  const surname = document.querySelector('#contact-surname');
  const email = document.querySelector('#contact-email');
  const phone = document.querySelector('#contact-phone');
  const birthday = document.querySelector('#contact-birthday');
  const cpf = document.querySelector('#contact-cpf');
  let genderOption;
  if (document.querySelector('#contact-gender-male').checked) {
    genderOption = 'masculino';
  } else if (document.querySelector('#contact-gender-female').checked) {
    genderOption = 'feminino';
  }

  const arrayEls = [_name.checkValidity(), surname.checkValidity(), email.checkValidity(), phone.checkValidity(), birthday.checkValidity(), cpf.checkValidity()];
  if (arrayEls.includes(false)) return;

  const validatorCpf = new ValidateCpf(cpf.value);
  if (!validatorCpf.validate()) {
    alert('CPF é inválido!');
    return;
  };

  const checkData = _name.value && surname.value && email.value && phone.value && birthday.value;
  if (!checkData) {
    alert('Informar dados corretamente!');
    return;
  }

  if (phone.value.length !== 11) {
    alert('Informar número de telefone corretamente!');
    return;
  }

  if (!validator.isEmail(email.value)) {
    alert('Informar e-mail válido!');
    return;
  }

  axios.post(`/agenda`, {
    _csrf: _csrf.dataset.csrftoken,
    name: _name.value,
    surname: surname.value,
    email: email.value,
    phone: phone.value,
    birthday: `${birthday.value}T00:00`,
    gender: genderOption,
    cpf: cpf.value,
  })
  .then(response => {
    handleFrontEnd(`contact`, cpf.value);
  }).catch(error => console.log(error)) 
}
