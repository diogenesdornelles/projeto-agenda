// prevent default behavior in forms from contactbook application
export default function initFormPreventPost (){
  setTimeout(() => {
    const form1 = document.querySelector('.form-new-contact');
    const form2 = document.querySelector('.form-update-contact');
    const form3 = document.querySelector('.form-schedule-contact');
    const form4 = document.querySelector('.register-painel .form');
    const form5 = document.querySelector('.login-painel .form-login');
    if (form1) {
      form1.addEventListener('submit', onSubmitForm);
    }
    if (form2) {
      form2.addEventListener('submit', onSubmitForm);
    }
    if (form3) {
      form3.addEventListener('submit', onSubmitForm);
    }
    if (form4){
      form4.addEventListener('submit', onSubmitForm);
    }
    if (form5) {
      form5.addEventListener('submit', onSubmitForm);
    }
  }, 200);
  function onSubmitForm(event) { 
    event.preventDefault();
  }
}

