import loadTableContacts from "./loadTableContacts";
const urlLoadContacts = `/agenda/contatos`;

export default function handleDeleteEvent(element) {
  const _csrf = document.querySelector('.header-table ._csrf');
  const id = element.dataset.id;
  let reqURLId = `/delete/contato/${id}`;
  axios.delete(reqURLId, {
    data: {_csrf: _csrf.dataset.csrftoken},
    headers: {
      'X-CSRFToken': _csrf.dataset.csrftoken,
    },
    withCredentials: true
  })
  .then(() => { 
    loadTableContacts(urlLoadContacts);
  })
  .catch((error) => {console.log(error)});
}