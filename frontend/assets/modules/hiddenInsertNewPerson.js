export default function hiddenInsertNewPerson(){
  const formInsert = document.querySelector('.form-insert-new-person'); 
  const divClose = document.querySelector('.div-close'); 
  formInsert.style.display = 'none';
  divClose.style.display = 'none';
}