import handleFrontEnd from '../handleFrontEnd'
import validator from 'validator'
import ValidateCpf from '../ValidateCpf'

function saveModifies (id) {
  const _csrf = document.querySelector('.header-table ._csrf')
  const _name = document.querySelector('#contact-new-name')
  const surname = document.querySelector('#contact-new-surname')
  const email = document.querySelector('#contact-new-email')
  const phone = document.querySelector('#contact-new-phone')
  const birthday = document.querySelector('#contact-new-birthday')
  const cpf = document.querySelector('#contact-new-cpf')
  let genderOption
  if (document.querySelector('#contact-new-gender-male').checked) {
    genderOption = 'masculino'
  } else if (document.querySelector('#contact-new-gender-female').checked) {
    genderOption = 'feminino'
  }

  const arrayEls = [_name.checkValidity(), surname.checkValidity(), email.checkValidity(), phone.checkValidity(), birthday.checkValidity(), cpf.checkValidity()]
  if (arrayEls.includes(false)) return

  const validatorCpf = new ValidateCpf(cpf.value)
  if (!validatorCpf.validate()) {
    alert('CPF é inválido!')
    return
  };

  const checkData = _name.value && surname.value && email.value && phone.value && birthday.value
  if (!checkData) {
    alert('Informar dados corretamente!')
    return
  }

  if (phone.value.length !== 11) {
    alert('Informar número de telefone corretamente!')
    return
  }

  if (!validator.isEmail(email.value)) {
    alert('Informar e-mail válido!')
    return
  }

  // eslint-disable-next-line no-undef
  axios.put(`/update/contato/${id}`, {
    _csrf: _csrf.dataset.csrftoken,
    name: _name.value,
    surname: surname.value,
    email: email.value,
    phone: phone.value,
    birthday: `${birthday.value}T00:00`,
    gender: genderOption,
    cpf: cpf.value
  })
    .then(() => {
      handleFrontEnd('contact', cpf.value)
    }).catch(error => console.log(error))
}

function configureUIModal (modal) {
  modal.style.display = 'flex'
  modal.style.flexDirection = 'column'
  modal.style.width = '40vw'
  modal.style.position = 'absolute'
  modal.style.top = '50%'
  modal.style.left = '50%'
  modal.style.transform = 'translate(-50%, -50%)'
}

function setDataOnFields (lis) {
  const _name = document.querySelector('#contact-new-name')
  const surname = document.querySelector('#contact-new-surname')
  const email = document.querySelector('#contact-new-email')
  const phone = document.querySelector('#contact-new-phone')
  const birthday = document.querySelector('#contact-new-birthday')
  const cpf = document.querySelector('#contact-new-cpf')
  const infos = []
  lis.forEach((li) => {
    infos.push(li.innerText)
  })
  _name.value = infos[0]
  surname.value = infos[1]
  email.value = infos[2]
  phone.value = infos[3]
  birthday.value = `${infos[4].slice(-4)}-${infos[4].slice(3, 5)}-${infos[4].slice(0, 2)}`
  const gender = infos[5]
  if (gender === 'masculino') {
    document.querySelector('#contact-new-gender-male').checked = true
    document.querySelector('#contact-new-gender-female').checked = false
  } else {
    document.querySelector('#contact-new-gender-male').checked = false
    document.querySelector('#contact-new-gender-female').checked = true
  }
  cpf.value = infos[6]
}

export default function handleUpdateContact (element) {
  const modal = document.querySelectorAll('DIALOG')[0]
  modal.showModal()
  configureUIModal(modal)
  const ul = element.parentNode.parentNode
  const id = element.dataset.id
  const lis = ul.querySelectorAll('LI:not(.li-btns)')
  setDataOnFields(lis)
  const btnClose = document.querySelector('#dialog-btn-close')
  const btnSend = document.querySelector('#dialog-btn-send')
  btnClose.onclick = () => {
    modal.close()
    modal.style.display = 'none'
  }
  btnSend.addEventListener('click', () => saveModifies(id))
}
