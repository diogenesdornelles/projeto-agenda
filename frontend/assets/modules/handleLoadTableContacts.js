import hiddenInsertNewPerson from "./hiddenInsertNewPerson";
import loadTableContacts from "./loadTableContacts";
const urlLoadContacts = `/agenda/contatos`;

export default function handleLoad() {
  loadTableContacts(urlLoadContacts);
  hiddenInsertNewPerson();
}