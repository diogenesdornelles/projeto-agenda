import handleFrontEnd from '../handleFrontEnd'

export default function handleLoginUser () {
  const userName = document.querySelector('#login-user').value
  const password = document.querySelector('#login-password').value
  if (!userName || !password) {
    alert('Informar usuário e senha!')
    return
  }
  console.log(userName, password)
  const form = document.querySelector('#form-login')
  if (form) {
    form.submit()
    handleFrontEnd('login', userName)
  };
}
