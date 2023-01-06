import clearInputs from './clearInputs'
import hiddenInsertNewContact from './contacts/hiddenInsertNewContact'
import loadTableContacts from './contacts/loadTableContacts'

export default function handleFrontEnd (url, param) {
  if (param === '') return
  setTimeout(() => {
    // eslint-disable-next-line no-undef
    axios.get(`/api/advice/${url}/${param}`)
      .then(response => {
        let text = ''
        for (const key in response.data) {
          if (response.data[key]) {
            text += response.data[key] + '\n'
          }
        }
        const modals = document.querySelectorAll('DIALOG')
        if (modals.length > 0) {
          modals.forEach(modal => {
            if (modal && modal.style.display === 'flex') {
              modal.close()
              modal.style.display = 'none'
            }
          })
        }

        const urlLoadContacts = '/agenda/contatos'

        if (text.includes('Contato salvo')) {
          alert(text)
          clearInputs()
          loadTableContacts(urlLoadContacts)
          hiddenInsertNewContact()
          return
        }

        if (text.includes('Contato atualizado')) {
          alert(text)
          clearInputs()
          loadTableContacts(urlLoadContacts)
          hiddenInsertNewContact()
          return
        }

        if (text.includes('Evento agendado')) {
          alert(text)
          clearInputs()
          loadTableContacts(urlLoadContacts)
          hiddenInsertNewContact()
          return
        }

        if (text.includes('Usuário autenticado')) {
          const loginHeader = document.querySelector('image-login')
          loginHeader.style.display = 'none'
          return
        }

        if (text.includes('Usuário criado')) {
          alert(text)
          clearInputs()
          return
        }

        if (text.includes('Evento atualizado')) {
          alert(text)
          clearInputs()
          return
        }

        if (text !== '') {
          alert(text)
        }
      })
      .catch(error => console.log(error))
  }, 500)
}
