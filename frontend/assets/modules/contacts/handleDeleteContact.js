import loadTableContacts from './loadTableContacts'
const urlLoadContacts = '/agenda/contatos'

export default function handleDeleteContact (element) {
  const _csrf = document.querySelector('.header-table ._csrf')
  const id = element.dataset.id
  const reqURLId = `/delete/contato/${id}`
  // eslint-disable-next-line no-undef
  axios.delete(reqURLId, {
    data: { _csrf: _csrf.dataset.csrftoken },
    headers: {
      'X-CSRFToken': _csrf.dataset.csrftoken
    },
    withCredentials: true
  })
    .then(() => {
      loadTableContacts(urlLoadContacts)
    })
    .catch((error) => { console.log(error) })
}
