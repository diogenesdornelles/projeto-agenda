export default async function manageLoggedUser(){
  let user;
  const el = document.querySelector('.header nav ul');
  if (el.childElementCount > 4) {
    const _idUser = el.querySelector('.logged-user').getAttribute("_idUser");  
    const nameUser = el.querySelector('.logged-user').getAttribute("nameUser"); 
    user = {
      logged: true,
      _idUser: _idUser,
      nameUser: nameUser
    }
  } else {
    user = {
      logged: false,
      _idUser: '',
      nameUser: ''
    }
  }
  window.localStorage.setItem("loggedUser", JSON.stringify(user)); 
  return;
}
