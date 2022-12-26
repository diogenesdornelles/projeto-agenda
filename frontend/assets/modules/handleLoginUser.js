import handleFrontEnd from "./handleFrontEnd";

export default function handleLoginUser(){
  const userName = document.querySelector('.login-painel #userName').value;
  const form = document.querySelector('#form-login');
  if (form){
    form.submit();
    handleFrontEnd('login', userName)
  };
} 
