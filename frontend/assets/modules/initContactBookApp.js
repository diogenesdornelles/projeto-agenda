import clearInputs from './clearInputs'
// New user
import handleRegisterNewUser from './users/handleRegisterNewUser'
// Login user
import handleLoginUser from './login/handleLoginUser'
// Contacts
import handleCopyContact from './contacts/handleCopyContact'
import handleDeleteContact from './contacts/handleDeleteContact'
import handleLoadTableContacts from './contacts/handleLoadTableContacts'
import handleSaveContact from './contacts/handleSaveContact'
import handleSearchContact from './contacts/handleSearchContact'
import handleUpdateContact from './contacts/handleUpdateContact'
import hiddenInsertNewContact from './contacts/hiddenInsertNewContact'
import showInsertNewContact from './contacts/showInsertNewContact'
// Events
import enableFormAttEvent from './events/enableFormAttEvent'
import handleFullCalendar from './events/handleFullCalendarEvents'
import handleNewContactEvent from './events/handleNewContactEvent'
import handleDeleteEvent from './events/handleDeleteEvent'
import handleUpdateEvent from './events/handleUpdateEvent'

export default function handleContactBookApp () {
  document.addEventListener('click', handleOperations)

  function handleOperations (event) {
    if (event.target.tagName.toLowerCase() === 'button' || event.target.tagName.toLowerCase() === 'a') {
      switch (event.target.innerText.toLowerCase()) {
        case 'buscar': handleSearchContact()
          break
        case 'inserir contato': showInsertNewContact()
          break
        case 'limpar': clearInputs()
          break
        case 'carregar lista': handleLoadTableContacts()
          break
        case 'fechar': hiddenInsertNewContact()
          break
        case 'enviar': handleSaveContact()
          break
        case 'deletar': handleDeleteContact(event.target)
          break
        case 'atualizar': handleUpdateContact(event.target)
          break
        case 'copiar': handleCopyContact(event.target)
          break
        case 'abrir agenda': handleFullCalendar()
          break
        case 'agendar': handleNewContactEvent(event.target)
          break
        case 'apagar': handleDeleteEvent()
          break
        case 'editar': enableFormAttEvent(event.target)
          break
        case 'salvar': handleUpdateEvent()
          break
        case 'logar': handleLoginUser()
          break
        case 'registrar': handleRegisterNewUser()
          break
      }
    }
  }
}
