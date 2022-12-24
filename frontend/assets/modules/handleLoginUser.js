import handleFrontEnd from "./handleFrontEnd";

export default function handleLoginUser(){
  const userName = document.querySelector('.login-painel #userName').value;
  if (userName.length < 3) return;
  else {
    document.querySelector('.login-painel .form-login').submit();
    handleFrontEnd('login', userName)};
}