import hiddenInsertNewPerson from './hiddenInsertNewContact'
import loadTableContacts from './loadTableContacts'
const urlLoadContacts = '/agenda/contatos'

export default function handleLoadTableContacts () {
  loadTableContacts(urlLoadContacts)
  hiddenInsertNewPerson()
}
